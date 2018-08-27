import React from 'react';
import Selector from './Selector';
import Informer from './Informer';

class Filter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      menuActivo: "",
    };
  }

  mostrarMenu(){
    if(!this.props.dataCapaActiva ){
      return (
        // alert(this.state.menuActivo),
        // alert(this.props.dataCapaActiva),
        // TODO: Revisar despliegue errado mediante estilo
        <Selector
        panelLayer = {this.props.panelLayer}
        subPanelLayer = {this.props.subPanelLayer}
        innerPanelLayer = {this.props.innerPanelLayer}
        estadoMenu= {this.state.menuActivo}
      />
    );
    } else { return this.mostrarInformacion(this.props.dataCapaActiva)}
  }

  mostrarInformacion(infoCapaActiva) {
    // TODO: Validar información: Designación y Administrado por
    if (this.props.dataCapaActiva) {
      return (<Informer back={this.props.handlerBackButton}
        geocerca={this.props.geocerca}
        nombre={this.props.dataCapaActiva.NOMCAR || this.props.dataCapaActiva}
        biomaActivo={this.props.biomaActivo}
        biomaActivoData={this.props.biomaActivoData}
      />)
    }
  }

  render() {
    return (
      <div className="filter">
        {this.mostrarMenu()}
      </div>
    );
  }
}

export default Filter;