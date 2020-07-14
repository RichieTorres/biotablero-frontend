import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/FirstPage';
import Ecosistemas from '@material-ui/icons/Nature';
import Especies from '@material-ui/icons/FilterVintage';
import Paisaje from '@material-ui/icons/FilterHdr';

import RestAPI from '../api/RestAPI';
import Overview from '../strategicEcosystems/Overview';
import TabContainer from '../commons/TabContainer';
import Landscape from '../landscape/Landscape';

const styles = () => ({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
  },
});

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: {
        biomas: null,
        distritos: null,
        fc: null,
        coverage: null,
        areaSE: null,
        areaPA: null,
        generalArea: 0,
        currentHF: [],
        currentHFPValue: 0,
        hfPersistence: [],
        hfTimeline: [],
      },
    };
  }

  componentWillMount() {
    this.setState(null);
  }

  componentDidMount() {
    const {
      geofence, area,
    } = this.props;

    const searchId = geofence.id || geofence.name;

    RestAPI.requestGeofenceDetails(area.id, searchId)
      .then((res) => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            generalArea: Number(res.total_area),
          },
        }));
      })
      .catch(() => {
      });


    RestAPI.requestCoverage(area.id, searchId)
      .then((res) => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            coverage: res,
          },
        }));
      })
      .catch(() => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            coverage: false,
          },
        }));
      });

    RestAPI.requestProtectedAreas(area.id, searchId)
      .then((res) => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            areaPA: res,
          },
        }));
      })
      .catch(() => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            areaPA: false,
          },
        }));
      });

    RestAPI.requestStrategicEcosystems(area.id, searchId)
      .then((res) => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            areaSE: res,
          },
        }));
      })
      .catch(() => {});

    RestAPI.requestCurrentHF()
      .then((res) => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            currentHF: res,
          },
        }));
      })
      .catch(() => {});

    RestAPI.requestHFPersistence()
      .then((res) => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            hfPersistence: res,
          },
        }));
      })
      .catch(() => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            hfPersistence: false,
          },
        }));
      });

    RestAPI.requestHFTimeline()
      .then((res) => {
        const aTotalData = res.find(o => o.key === 'aTotal').data;
        const maxYear = Math.max(...aTotalData.map(o => Number(o.x)));
        const currentHFPValue = Number(aTotalData.find(o => Number(o.x) === maxYear).y);
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            hfTimeline: res,
            currentHFPValue,
          },
        }));
      })
      .catch(() => {
        this.setState(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            hfTimeline: false,
          },
        }));
      });

    if (area.id === 'ea') {
      RestAPI.requestBiomes(area.id, searchId)
        .then((res) => {
          this.setState(prevState => ({
            ...prevState,
            data: {
              ...prevState.data,
              biomas: res,
            },
          }));
        })
        .catch(() => {
          this.setState(prevState => ({
            ...prevState,
            data: {
              ...prevState.data,
              biomas: false,
            },
          }));
        });

      RestAPI.requestCompensationFactor(area.id, searchId)
        .then((res) => {
          this.setState(prevState => ({
            ...prevState,
            data: {
              ...prevState.data,
              fc: res,
            },
          }));
        })
        .catch(() => {
          this.setState(prevState => ({
            ...prevState,
            data: {
              ...prevState.data,
              fc: false,
            },
          }));
        });

      RestAPI.requestBioticUnits(area.id, searchId)
        .then((res) => {
          this.setState(prevState => ({
            ...prevState,
            data: {
              ...prevState.data,
              distritos: res,
            },
          }));
        })
        .catch(() => {
          this.setState(prevState => ({
            ...prevState,
            data: {
              ...prevState.data,
              distritos: false,
            },
          }));
        });
    }
  }

  render() {
    const {
      geofence,
      timelineHFArea,
      handlerBackButton,
      subLayerName,
      area,
      matchColor,
      handlerShutOffAllLayers,
      handlerSwitchLayer,
      handlerClickOnGraph,
    } = this.props;
    const {
      data: {
        fc,
        biomas,
        distritos,
        coverage,
        areaPA,
        areaSE,
        generalArea,
        currentHF,
        currentHFPValue,
        hfPersistence,
        hfTimeline,
      },
    } = this.state;
    return (
      <div className="informer">
        <div className="drawer_header">
          <button
            className="geobtn"
            type="button"
            onClick={handlerBackButton}
          >
            <BackIcon />
          </button>
          <div className="HAgen">
            <h4>
              hectáreas totales
              <b>{`${numberWithCommas(generalArea.toFixed(0))} ha`}</b>
            </h4>
          </div>
        </div>
        { !subLayerName && (
          <TabContainer
            initialSelectedIndex={0}
            titles={[
              { label: 'Ecosistemas', icon: (<Ecosistemas />) },
              { label: 'Paisaje', icon: (<Paisaje />) },
              { label: 'Especies', icon: (<Especies />) },
            ]}
            handlerShutOffAllLayers={handlerShutOffAllLayers}
          >
            <div>
              <Overview
                generalArea={Number(generalArea)}
                listSE={areaSE}
                listPA={areaPA}
                coverage={coverage}
                areaId={area.id}
                geofenceId={area.id === 'pa' ? geofence.name : geofence.id}
                matchColor={matchColor}
              />
            </div>
            <div>
              <Landscape
                fc={fc}
                biomas={biomas}
                distritos={distritos}
                currentHF={currentHF}
                currentHFPValue={currentHFPValue}
                hfPersistence={hfPersistence}
                hfTimeline={hfTimeline}
                areaName={area.name}
                matchColor={matchColor}
                timelineHFArea={timelineHFArea}
                handlerSwitchLayer={handlerSwitchLayer}
                handlerClickOnGraph={handlerClickOnGraph}
              />
            </div>
            <div className="graphcard">
              <h2>
                Gráficas en construcción
              </h2>
              <p>
                Pronto más información
              </p>
            </div>
          </TabContainer>
        )}
        {/* // TODO: This functionality should be implemented again
          subLayerName && timelineHFArea && (
          <div className={classes.root}>
            <RenderGraph
              graph="BarVertical"
              data={timelineHFArea}
              graphTitle="ha por Subzonas Hidrográficas"
              colors={colorSZH}
              labelX="Subzonas Hidrográficas"
              labelY="Hectáreas"
              units="ha"
            />
          </div>
        ) */}
      </div>
    );
  }
}

Drawer.propTypes = {
  area: PropTypes.object.isRequired,
  geofence: PropTypes.object,
  handlerBackButton: PropTypes.func,
  timelineHFArea: PropTypes.object,
  subLayerName: PropTypes.string,
  matchColor: PropTypes.func,
  handlerShutOffAllLayers: PropTypes.func,
  handlerSwitchLayer: PropTypes.func,
  handlerClickOnGraph: PropTypes.func,
};

Drawer.defaultProps = {
  geofence: { id: NaN, name: '' },
  timelineHFArea: {},
  subLayerName: '',
  handlerBackButton: () => {},
  matchColor: () => {},
  handlerShutOffAllLayers: () => {},
  handlerSwitchLayer: () => {},
  handlerClickOnGraph: () => {},
};

export default withStyles(styles)(Drawer);
