import React from "react";
import InfoIcon from "@mui/icons-material/Info";

import GraphLoader from "components/charts/GraphLoader";
import { LegendColor } from "components/CssLegends";
import ShortInfo from "components/ShortInfo";
import { IconTooltip } from "components/Tooltips";
import SearchContext, { SearchContextValues } from "pages/search/SearchContext";
import matchColor from "utils/matchColor";
import SearchAPI from "utils/searchAPI";
import formatNumber from "utils/format";
import TextBoxes from "components/TextBoxes";

import { currentPAConn, DPCKeys, DPC } from "pages/search/types/connectivity";
import { TextObject } from "pages/search/types/texts";

const getLabel = {
  unprot: "No protegida",
  prot_conn: "Protegida conectada",
  prot_unconn: "Protegida no conectada",
};

const legendDPCCategories = {
  muy_bajo: "Muy bajo",
  bajo: "Bajo",
  medio: "Medio",
  alto: "Alto",
  muy_alto: "Muy Alto",
};

interface currentPAConnExt extends currentPAConn {
  label: string;
}

interface Props {}

interface currentPAConnState {
  infoShown: Set<string>;
  currentPAConnData: Array<currentPAConnExt>;
  dpcData: Array<DPC>;
  prot: number;
  messages: {
    conn: string | null;
    dpc: string | null;
  };
  texts: {
    paConnCurrent: TextObject;
    paConnDPC: TextObject;
  };
}

class CurrentPAConnectivity extends React.Component<Props, currentPAConnState> {
  mounted = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      infoShown: new Set(["current"]),
      currentPAConnData: [],
      dpcData: [],
      prot: 0,
      messages: {
        conn: "loading",
        dpc: "loading",
      },
      texts: {
        paConnCurrent: { info: "", cons: "", meto: "", quote: "" },
        paConnDPC: { info: "", cons: "", meto: "", quote: "" },
      },
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { areaId, geofenceId, switchLayer } = this
      .context as SearchContextValues;

    switchLayer("currentPAConn");

    SearchAPI.requestCurrentPAConnectivity(areaId, geofenceId)
      .then((res: Array<currentPAConn>) => {
        if (this.mounted) {
          const protConn = res.find((item) => item.key === "prot_conn");
          const protUnconn = res.find((item) => item.key === "prot_unconn");
          this.setState((prev) => ({
            currentPAConnData: res.map((item) => ({
              ...item,
              label: getLabel[item.key],
            })),
            prot:
              protConn && protUnconn
                ? (protConn.percentage + protUnconn.percentage) * 100
                : 0,
            messages: {
              ...prev.messages,
              conn: null,
            },
          }));
        }
      })
      .catch(() => {
        this.setState((prev) => ({
          messages: {
            ...prev.messages,
            conn: "no-data",
          },
        }));
      });

    SearchAPI.requestDPC(areaId, geofenceId, 5)
      .then((res: Array<DPC>) => {
        if (this.mounted) {
          this.setState((prev) => ({
            dpcData: res.reverse(),
            messages: {
              ...prev.messages,
              dpc: null,
            },
          }));
        }
      })
      .catch(() => {
        this.setState((prev) => ({
          messages: {
            ...prev.messages,
            dpc: "no-data",
          },
        }));
      });

    ["paConnCurrent", "paConnDPC"].forEach((item) => {
      SearchAPI.requestSectionTexts(item)
        .then((res) => {
          if (this.mounted) {
            this.setState((prevState) => ({
              texts: { ...prevState.texts, [item]: res },
            }));
          }
        })
        .catch(() => {
          this.setState((prevState) => ({
            texts: {
              ...prevState.texts,
              [item]: { info: "", cons: "", meto: "", quote: "" },
            },
          }));
        });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  toggleInfo = (value: string) => {
    this.setState((prev) => {
      const newState = prev;
      if (prev.infoShown.has(value)) {
        newState.infoShown.delete(value);
        return newState;
      }
      newState.infoShown.add(value);
      return newState;
    });
  };

  render() {
    const { areaId, geofenceId, handlerClickOnGraph } = this
      .context as SearchContextValues;
    const {
      currentPAConnData,
      dpcData,
      prot,
      infoShown,
      messages: { conn, dpc: dpcMess },
      texts,
    } = this.state;
    return (
      <div className="graphcontainer pt6">
        <h2>
          <IconTooltip title="Interpretación">
            <InfoIcon
              className={`graphinfo${
                infoShown.has("current") ? " activeBox" : ""
              }`}
              onClick={() => this.toggleInfo("current")}
            />
          </IconTooltip>
        </h2>
        {infoShown.has("current") && (
          <ShortInfo
            description={texts.paConnCurrent.info}
            className="graphinfo2"
            collapseButton={false}
          />
        )}
        <div>
          <h6>Conectividad áreas protegidas</h6>
          <div>
            <GraphLoader
              graphType="LargeBarStackGraph"
              data={currentPAConnData}
              message={conn}
              labelX="Hectáreas"
              labelY="Conectividad Áreas Protegidas"
              units="ha"
              colors={matchColor("currentPAConn")}
              padding={0.25}
            />
            <TextBoxes
              consText={texts.paConnCurrent.cons}
              metoText={texts.paConnCurrent.meto}
              quoteText={texts.paConnCurrent.quote}
              downloadData={currentPAConnData}
              downloadName={`conn_current_${areaId}_${geofenceId}.csv`}
              toggleInfo={() => this.toggleInfo("current")}
              isInfoOpen={infoShown.has("current")}
            />
          </div>
          {currentPAConnData.length > 0 && (
            <div>
              <h6 className="innerInfo">Porcentaje de área protegida</h6>
              <h5
                className="innerInfoH5"
                style={{
                  backgroundColor: matchColor("timelinePAConn")("prot"),
                }}
              >
                {`${formatNumber(prot, 2)}%`}
              </h5>
            </div>
          )}
          <h6>Aporte de las áreas protegidas a la conectividad</h6>
          <IconTooltip title="Interpretación">
            <InfoIcon
              className={`downSpecial${
                infoShown.has("dpc") ? " activeBox" : ""
              }`}
              onClick={() => this.toggleInfo("dpc")}
            />
          </IconTooltip>
          {infoShown.has("dpc") && (
            <ShortInfo
              description={texts.paConnDPC.info}
              className="graphinfo2"
              collapseButton={false}
            />
          )}
          <h3 className="innerInfoH3">
            Haz clic en un área protegida para visualizarla
          </h3>
          <div>
            <GraphLoader
              graphType="MultiSmallSingleBarGraph"
              data={dpcData}
              message={dpcMess}
              colors={matchColor("dpc")}
              onClickGraphHandler={(selected) =>
                handlerClickOnGraph({ selectedKey: selected })
              }
              labelX="dPC"
              units="ha"
            />
          </div>
          <div className="dpcLegend">
            {DPCKeys.map((cat) => (
              <LegendColor color={matchColor("dpc")(cat)} key={cat}>
                {legendDPCCategories[cat]}
              </LegendColor>
            ))}
          </div>
          <TextBoxes
            consText={texts.paConnDPC.cons}
            metoText={texts.paConnDPC.meto}
            quoteText={texts.paConnDPC.quote}
            downloadData={dpcData}
            downloadName={`conn_dpc_${areaId}_${geofenceId}.csv`}
            isInfoOpen={infoShown.has("dpc")}
            toggleInfo={() => this.toggleInfo("dpc")}
          />
        </div>
      </div>
    );
  }
}

export default CurrentPAConnectivity;

CurrentPAConnectivity.contextType = SearchContext;