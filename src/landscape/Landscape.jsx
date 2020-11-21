import PropTypes from 'prop-types';
import React from 'react';

import CompensationFactor from './CompensationFactor';
import HumanFootprint from './HumanFootprint';
import Forest from './Forest';
import LandscapeAccordion from './LandscapeAccordion';
import SearchContext from '../SearchContext';

class Landscape extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { areaId } = this.context;
    this.state = {
      visible: areaId === 'ea' ? 'fc' : 'hf',
      childMap: {
        fc: 'fc',
        hf: 'hfCurrent',
        forest: 'forestLossPersistence',
      },
    };
  }

  componentDidMount() {
    const { handlerSwitchLayer } = this.props;
    const { visible, childMap } = this.state;
    handlerSwitchLayer(childMap[visible]);
  }

  /**
   * Handles requests to load a layer when there are changes in accordions
   * @param {String} level accordion level that's calling the function
   * @param {String} tabLayerId layer to be loaded (also tab expanded). null if collapsed
   */
  handlerAccordionGeometry = (level, tabLayerId) => {
    const { handlerSwitchLayer } = this.props;
    const { visible, childMap } = this.state;
    if (tabLayerId === null) handlerSwitchLayer(null);

    switch (level) {
      case '1':
        this.setState({ visible: tabLayerId });
        handlerSwitchLayer(childMap[tabLayerId]);
        break;
      case '2':
        this.setState(prev => ({
          childMap: {
            ...prev.childMap,
            [visible]: tabLayerId,
          },
        }));
        handlerSwitchLayer(tabLayerId);
        break;
      default:
        break;
    }
  }

  render() {
    const { areaId } = this.context;

    const componentsArray = [
      {
        label: {
          id: 'fc',
          name: 'FC y Biomas',
          disabled: areaId !== 'ea',
        },
        component: CompensationFactor,
      },
      {
        label: {
          id: 'hf',
          name: 'Huella humana',
          disabled: false,
        },
        component: HumanFootprint,
        componentProps: { handlerAccordionGeometry: this.handlerAccordionGeometry },
      },
      {
        label: {
          id: 'forest',
          name: 'Bosques',
          disabled: false,
        },
        component: Forest,
        componentProps: { handlerAccordionGeometry: this.handlerAccordionGeometry },
      },
    ];
    return (
      <LandscapeAccordion
        componentsArray={componentsArray}
        classNameDefault="m0b"
        classNameSelected="m0b selector-expanded"
        handlerAccordionGeometry={this.handlerAccordionGeometry}
        level="1"
      />
    );
  }
}

Landscape.propTypes = {
  handlerSwitchLayer: PropTypes.func,
};

Landscape.defaultProps = {
  handlerSwitchLayer: () => {},
};

export default Landscape;

Landscape.contextType = SearchContext;
