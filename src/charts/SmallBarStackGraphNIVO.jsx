import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';

const SmallBarStackGraphNIVO = (props) => {
  const {
    data,
    width,
    height,
    zScale,
    units,
  } = props;

  /**
   * Give format to a big number
   *
   * @param {number} x number to be formatted
   * @returns {String} number formatted setting decimals and thousands properly
   */
  const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  /**
   * Transform data structure to be passed to component as a prop
   *
   * @param {array} rawData raw data from RestAPI
   * @returns {array} transformed data ready to be used by graph component
   */
  const transformData = (rawData) => {
    const transformedData = {
      key: 'key',
    };
    rawData.forEach((item) => {
      transformedData[String(item.key || item.type)] = Number(item.area || item.percentage);
    });
    return [transformedData];
  };

  /**
   * Get keys to be passed to component as a prop
   *
   * @returns {array} ids of each bar
   */
  const keys = data.map(item => String(item.key || item.type));

  /**
   * Get percentage for each value
   *
   * @param {string} id id or key for each value
   * @returns {number} percentage associated to each value
   */
  const getPercentage = id => data.find(item => item.key || item.type === id).percentage;

  /**
   * Get tooltip for graph component according to id of bar
   *
   * @param {string} id id for each bar
   * @param {number} value value for each bar
   * @returns {func} tooltip for component
   */
  const getToolTip = (id, value) => {
    if (id !== 'NA') {
      return (
        <div style={{
          backgroundColor: '#333',
          color: '#ffffff',
          padding: '5px 10px',
          lineHeight: '1.5',
          borderRadius: 5,
          minWidth: 60,
          boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
        }}
        >
          <strong style={{ color: '#e84a5f' }}>
            {id}
          </strong>
          <div>
            {`${numberWithCommas(value.toFixed(2))} ${units}`}
            <br />
            {`${numberWithCommas((getPercentage(id) * 100).toFixed(2))}%`}
          </div>
        </div>
      );
    }
    return (
      <div style={{ display: 'none' }} />
    );
  };

  return (
    <div style={{ width, height }}>
      <ResponsiveBar
        data={transformData(data)}
        keys={keys}
        indexBy="key"
        layout="horizontal"
        margin={{
          top: 0,
          right: 5,
          bottom: 0,
          left: 5,
        }}
        padding={0.19}
        colors={obj => zScale(obj.id)}
        enableGridY={false}
        axisLeft={null}
        enableLabel={false}
        animate
        motionStiffness={90}
        motionDamping={15}
        tooltip={({ id, value }) => (getToolTip(id, value))}
        theme={{
          tooltip: {
            container: {
              padding: 0,
            },
          },
        }
        }
      />
    </div>
  );
};

SmallBarStackGraphNIVO.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  zScale: PropTypes.func,
  units: PropTypes.string,
};

SmallBarStackGraphNIVO.defaultProps = {
  width: 581,
  height: 30,
  zScale: () => {},
  units: 'ha',
};

export default SmallBarStackGraphNIVO;
