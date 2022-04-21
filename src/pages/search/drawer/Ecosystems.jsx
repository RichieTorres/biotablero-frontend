import InfoIcon from '@mui/icons-material/Info';
import PropTypes from 'prop-types';
import React from 'react';

import {
  sectionInfo,
  CoverageText,
  PAText,
  SEText,
} from 'pages/search/drawer/strategicEcosystems/InfoTexts';
import { transformPAValues, transformCoverageValues } from 'pages/search/utils/transformData';
import EcosystemsBox from 'pages/search/drawer/strategicEcosystems/EcosystemsBox';
import SearchContext from 'pages/search/SearchContext';
import GraphLoader from 'components/charts/GraphLoader';
import ShortInfo from 'components/ShortInfo';
import { InfoTooltip, IconTooltip } from 'components/Tooltips';
import formatNumber from 'utils/format';
import matchColor from 'utils/matchColor';
import RestAPI from 'utils/restAPI';

/**
 * Calculate percentage for a given value according to total
 *
 * @param {number} part value for the given part
 * @param {number} total value obtained by adding all parts
 * @returns {number} percentage associated to each part
 */
const getPercentage = (part, total) => ((part * 100) / total).toFixed(2);

class StrategicEcosystems extends React.Component {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      showInfoGraph: false,
      coverage: [],
      PAAreas: [],
      PATotalArea: 0,
      SEAreas: [],
      SETotalArea: 0,
      loadingSE: true,
    };
  }

  componentDidMount() {
    this.mounted = true;
    const {
      areaId,
      geofenceId,
      switchLayer,
    } = this.context;
    const { generalArea } = this.props;

    switchLayer('coverages');

    RestAPI.requestCoverage(areaId, geofenceId)
      .then((res) => {
        if (this.mounted) {
          this.setState({ coverage: transformCoverageValues(res) });
        }
      })
      .catch(() => {});

    RestAPI.requestProtectedAreas(areaId, geofenceId)
      .then((res) => {
        if (this.mounted) {
          if (Array.isArray(res) && res[0]) {
            const PATotalArea = res.map((i) => i.area).reduce((prev, next) => prev + next);
            const PAAreas = transformPAValues(res, generalArea);
            this.setState({ PAAreas, PATotalArea });
          }
        }
      })
      .catch(() => {});

    RestAPI.requestStrategicEcosystems(areaId, geofenceId)
      .then((res) => {
        if (this.mounted) {
          if (Array.isArray(res)) {
            const SETotal = res.find((obj) => obj.type === 'Total');
            const SETotalArea = SETotal ? SETotal.area : 0;
            const SEAreas = res.slice(1);
            this.setState({ SEAreas, SETotalArea });
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (this.mounted) {
          this.setState({ loadingSE: false });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Transform data to fit in the graph structure
   * @param {array} data data to be transformed
   *
   * @returns {array} data transformed
   */
   processData = (data) => {
    const { generalArea } = this.props;
    if (!data) return [];
    return data.map((obj) => ({
      ...obj,
      percentage: obj.area / generalArea,
    }));
  };

  toggleInfo = () => {
    this.setState((prevState) => ({
      showInfoGraph: !prevState.showInfoGraph,
    }));
  };

  /**
   * Returns the component EcosystemsBox that contains the list of strategic ecosystems
   * @param {Array} SEAreas area of each strategic ecosystem
   * @param {Number} SETotalArea total area of all strategic ecosystems
   *
   * @returns {node} Component to be rendered
   */
  renderEcosystemsBox = (SEAreas, SETotalArea) => {
    const { loadingSE } = this.state;
    if (loadingSE) return ('Cargando...');
    if (SEAreas.length <= 0) return ('No hay información de áreas protegidas para el área de consulta');
    return (
      <EcosystemsBox
        SETotalArea={Number(SETotalArea)}
        SEAreas={this.processData(SEAreas)}
      />
    );
  };

  render() {
    const {
      generalArea,
    } = this.props;
    const {
      showInfoGraph,
      coverage,
      PAAreas,
      PATotalArea,
      SEAreas,
      SETotalArea,
    } = this.state;
    const { handlerClickOnGraph } = this.context;
    return (
      <div className="graphcard">
        <h2>
          <IconTooltip title="Acerca de esta sección">
            <InfoIcon
              className="graphinfo"
              onClick={() => this.toggleInfo()}
            />
          </IconTooltip>
        </h2>
        {showInfoGraph && (
          <ShortInfo
            description={sectionInfo}
            className="graphinfo2"
            collapseButton={false}
          />
        )}
        <div className="graphcontainer pt5">
          <InfoTooltip
            placement="left"
            title={CoverageText}
          >
            <h4>
              Cobertura
            </h4>
          </InfoTooltip>
          <h6>
            Natural, Secundaria y Transformada:
          </h6>
          <div className="graficaeco">
            <div className="svgPointer">
              <GraphLoader
                graphType="SmallBarStackGraph"
                data={coverage}
                units="ha"
                colors={matchColor('coverage')}
                onClickGraphHandler={(selected) => {
                  handlerClickOnGraph({ chartType: 'coverage', selectedKey: selected });
                }}
              />
            </div>
          </div>
          <InfoTooltip
            placement="left"
            title={PAText}
          >
            <h4>
              Áreas protegidas
              <b>{`${formatNumber(PATotalArea, 0)} ha `}</b>
            </h4>
          </InfoTooltip>
          <h5>
            {`${getPercentage(PATotalArea, generalArea)} %`}
          </h5>
          <div className="graficaeco">
            <h6>
              Distribución por áreas protegidas:
            </h6>
            <GraphLoader
              graphType="SmallBarStackGraph"
              data={PAAreas}
              units="ha"
              colors={matchColor('pa')}
            />
          </div>
          <div className="ecoest">
            <InfoTooltip
              placement="left"
              title={SEText}
            >
              <h4 className="minus20">
                Ecosistemas estratégicos
                <b>{`${formatNumber(SETotalArea, 0)} ha`}</b>
              </h4>
            </InfoTooltip>
            <h5 className="minusperc">
              {`${getPercentage(SETotalArea, generalArea)} %`}
            </h5>
            {this.renderEcosystemsBox(SEAreas, SETotalArea)}
          </div>
        </div>
      </div>
    );
  }
}

StrategicEcosystems.propTypes = {
  generalArea: PropTypes.number,
};

StrategicEcosystems.defaultProps = {
  generalArea: 0,
};

export default StrategicEcosystems;

StrategicEcosystems.contextType = SearchContext;
