import DownloadIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import React from 'react';

import DotInfo from 'components/charts/DotInfo';
import DotsGraph from 'components/charts/DotsGraph';
import LargeBarStackGraph from 'components/charts/LargeBarStackGraph';
import MultiLinesGraph from 'components/charts/MultiLinesGraph';
import MultiSmallBarStackGraph from 'components/charts/MultiSmallBarStackGraph';
import PieGraph from 'components/charts/PieGraph';
import SmallBarStackGraph from 'components/charts/SmallBarStackGraph';

const GraphLoader = (props) => {
  const {
    graphType,
    data,
    graphTitle,
    colors,
    labelX,
    labelY,
    width,
    elementOnClick,
    activeBiome,
    showOnlyTitle,
    units,
    padding,
    onClickGraphHandler,
    markers,
    loading,
    selectedIndexValue,
  } = props;

  // While data is being retrieved from server
  let errorMessage = null;
  // (data === null) while waiting for API response
  if (data === null || loading) errorMessage = 'Cargando información...';
  // (!data) if API doesn't respond
  else if (!data) errorMessage = 'Información no disponible';
  // (data.length <= 0) if API response in not object
  else if (data.length <= 0) errorMessage = 'Información no disponible';
  if (errorMessage) {
    // TODO: ask Cesar to make this message nicer
    return (
      <div className="errorData">
        {errorMessage}
      </div>
    );
  }

  switch (graphType) {
    case 'LargeBarStackGraph':
      return (
        <LargeBarStackGraph
          data={data}
          labelX={labelX}
          labelY={labelY}
          height={150}
          colors={colors}
          padding={padding}
          units={units}
          onClickGraphHandler={onClickGraphHandler}
        />
      );
    case 'SmallBarStackGraph':
      return (
        <SmallBarStackGraph
          data={data}
          height={30}
          colors={colors}
          units={units}
        />
      );
    case 'MultiSmallBarStackGraph':
      return (
        <MultiSmallBarStackGraph
          data={data}
          height={250}
          colors={colors}
          units={units}
          onClickHandler={onClickGraphHandler}
          selectedIndexValue={selectedIndexValue}
        />
      );
    case 'pie':
      return (
        <PieGraph
          data={data}
          height={350}
          units={units}
          colors={colors}
          onClickHandler={onClickGraphHandler}
        />
      );
    case 'Dots':
      return (
        <div className="graphcard pb">
          <h2>
            <DownloadIcon className="icondown" />
            Ecosistemas Equivalentes
          </h2>
          { !showOnlyTitle && (
            <div>
              <p className="legcomp">
                Agrega uno o varios Biomas a tus opciones de compensación
                <br />
                FC
                <b>
                  Alto
                </b>
                <i>
                  Medio
                </i>
                <em>
                  Bajo
                </em>
                y cantidad de area afectada
              </p>
              <DotsGraph
                activeBiome={activeBiome}
                colors={colors}
                dataJSON={data}
                elementOnClick={elementOnClick}
                graphTitle={graphTitle}
                labelX={labelX}
                labelY={labelY}
                height="280"
                units={units}
                width={width}
              />
            </div>
          )}
        </div>
      );
    case 'DotInfo':
      return (
        <DotInfo
          data={data}
          width={width}
          height="100"
        />
      );
    case 'MultiLinesGraph':
      return (
        <MultiLinesGraph
          onClickGraphHandler={onClickGraphHandler}
          colors={colors}
          data={data}
          markers={markers}
          height={490}
        />
      );
    default:
      return '';
  }
};

GraphLoader.propTypes = {
  graphType: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  graphTitle: PropTypes.string,
  activeBiome: PropTypes.string,
  labelX: PropTypes.string,
  labelY: PropTypes.string,
  width: PropTypes.number,
  showOnlyTitle: PropTypes.bool,
  units: PropTypes.string,
  elementOnClick: PropTypes.func,
  // TODO: Remove array type once the charts in compensation are migrated
  colors: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
  padding: PropTypes.number,
  onClickGraphHandler: PropTypes.func,
  markers: PropTypes.arrayOf(PropTypes.shape({
    axis: PropTypes.string,
    value: PropTypes.number,
    type: PropTypes.string,
    legendPosition: PropTypes.string,
  })),
  loading: PropTypes.bool,
  selectedIndexValue: PropTypes.string,
};

GraphLoader.defaultProps = {
  graphTitle: '',
  activeBiome: '',
  labelX: '',
  labelY: '',
  showOnlyTitle: false,
  units: 'ha',
  elementOnClick: () => {},
  colors: () => {},
  padding: 0.25,
  onClickGraphHandler: () => {},
  markers: [],
  loading: false,
  selectedIndexValue: '',
};

export default GraphLoader;