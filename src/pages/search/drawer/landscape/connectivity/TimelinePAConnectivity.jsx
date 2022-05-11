import React from 'react';
import InfoIcon from '@mui/icons-material/Info';

import GraphLoader from 'components/charts/GraphLoader';
import ShortInfo from 'components/ShortInfo';
import { IconTooltip } from 'components/Tooltips';
import { TimelinePAConnTexts } from 'pages/search/drawer/landscape/connectivity/InfoTexts';
import SearchContext from 'pages/search/SearchContext';
import matchColor from 'utils/matchColor';
import processDataCsv from 'utils/processDataCsv';
import RestAPI from 'utils/restAPI';
import TextBoxes from 'components/TextBoxes';

const {
  info,
  meto,
  cons,
  quote,
} = TimelinePAConnTexts;
class TimelinePAConnectivity extends React.Component {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      showInfoGraph: true,
      timelinePAConnectivity: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { areaId, geofenceId, switchLayer } = this.context;
    switchLayer('timelinePAConn');

    Promise.all([
      RestAPI.requestTimelinePAConnectivity(areaId, geofenceId, 'prot'),
      RestAPI.requestTimelinePAConnectivity(areaId, geofenceId, 'prot_conn'),
    ])
      .then((res) => {
        if (this.mounted) {
          this.setState({ timelinePAConnectivity: this.processData(res) });
        }
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Show or hide the detailed information on each graph
   */
  toggleInfoGraph = () => {
    this.setState((prevState) => ({
      showInfoGraph: !prevState.showInfoGraph,
    }));
  };

  /**
   * Defines the label for a given data
   * @param {string} key key identifier
   *
   * @returns {string} label to be used for tooltips and legends.
   */
  getLabel = (key) => {
    switch (key) {
      case 'prot': return 'Protegida';
      case 'prot_conn': return 'Protegida Conectada';
      default: return '';
    }
  };

  /**
   * Transform data to fit in the graph structure
   * @param {array} data data to be transformed
   *
   * @returns {array} transformed array
   */
  processData = (data) => {
    if (!data) return [];
    return data.map((obj) => ({
      ...obj,
      data: obj.data.map((item) => ({
        ...item,
        y: item.y * 100,
      })),
      label: this.getLabel(obj.key),
    }));
  };

  render() {
    const {
      showInfoGraph,
      timelinePAConnectivity,
    } = this.state;
    const {
      areaId,
      geofenceId,
    } = this.context;
    return (
      <div className="graphcontainer pt6">
        <h2>
          <IconTooltip title="Interpretación">
            <InfoIcon
              className="graphinfo"
              onClick={() => this.toggleInfoGraph()}
            />
          </IconTooltip>
        </h2>
        {showInfoGraph && (
          <ShortInfo
            description={info}
            className="graphinfo2"
            collapseButton={false}
          />
        )}
        <div>
          <h6>
            Conectividad áreas protegidas en el tiempo
          </h6>
          <div>
            <GraphLoader
              graphType="MultiLinesGraph"
              colors={matchColor('timelinePAConn')}
              data={timelinePAConnectivity}
              labelX="Año"
              labelY="Porcentaje"
              units="%"
              yMax={50}
            />
            <TextBoxes
              consText={cons}
              metoText={meto}
              quoteText={quote}
              downloadData={processDataCsv(timelinePAConnectivity)}
              downloadName={`conn_timeline_${areaId}_${geofenceId}.csv`}
              isInfoOpen={showInfoGraph}
              toggleInfo={this.toggleInfoGraph}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TimelinePAConnectivity;

TimelinePAConnectivity.contextType = SearchContext;
