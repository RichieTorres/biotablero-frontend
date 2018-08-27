// adevia
// TODO: Ajustar evento del Autocompletar sobre el mapa

import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import jsonData from './prueba.geojson'; // Fuente: https://github.com/decolector/bta-geodata/blob/master/local.geojson

class ProjectSelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: 'Centro',  // Inicia con opción 'Centro' activa
      subExpanded: null,
      innerExpanded: null,
    };
    this.props.panelLayer('Centro'); // Inicia activa
    this.props.subPanelLayer('En Licenciamiento'); // Inicia activa
    // this.props.innerPanelLayer('Sogamoso');
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
    this.props.panelLayer(panel);
    this.props.subPanelLayer(null);
  };

  subHandleChange = subPanel => (event, expanded) => {
    this.setState({
      subExpanded: expanded ? subPanel : false,
    });
    this.props.subPanelLayer(subPanel);
  };

  innerHandleChange = innerPanel => (event, expanded) => {
    this.setState({
      innerExpanded: expanded ? innerPanel : false,
    });
    this.props.innerPanelLayer(innerPanel);
  };


  render() {
    const { expanded, subExpanded /*, innerExpanded, onClick, value */} = this.state;
    this.handleChange('Centro');
    return (
      // TODO: Crear un arreglo dinámico del tipo de componente a agregar,
      // URL, contenido del texto y jerarquía para mostrar en el menú de la página
      <div className="selector">
        <div className="iconsec2"></div>
        <h1>Compensaciones</h1>
        <p>En esta sección podrás encontrar información sobre <b>¿Qué y cuánto compensar?</b>, <b>¿Dónde y cómo compensar?</b>, para esto:</p>
        <p><i>1</i> Selecciona una <b>Zona GEB</b></p>
        <p><i>2</i> Selecciona un <b>proyecto</b> (licenciado, en licenciamiento o diagnóstico) o crea un <b>nuevo proyecto</b></p>
        <p><i>3</i> Consulta el qué y cuánto (proyectos previamente analizados)</p>
        <p><i>4</i> Selecciona el dónde y cómo para alcanzar las metas de compensación (proyectos previamente analizados)</p>
        <ExpansionPanel className="m0" id='panel1-Norte' disabled
          expanded= {expanded === 'Norte'}
          onChange={this.handleChange('Norte')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Norte
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <ExpansionPanel className="m0" id="panel1-Centro"
          expanded= {expanded === 'Centro'} onChange={this.handleChange('Centro')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Centro
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="acordeon" id="proyectos">
            <ExpansionPanel className="m0" id='licenciados'
              expanded= {subExpanded === 'Licenciados'}
              onChange={this.subHandleChange('Licenciados')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              Licenciados
              </ExpansionPanelSummary>
            </ExpansionPanel>
            <ExpansionPanel className="m0" id='enLicenciamiento'
              expanded= {subExpanded === 'En Licenciamiento'}
              onChange={this.subHandleChange('En Licenciamiento')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              En licenciamiento
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="inlineb">
                <button onClick={() => this.props.innerPanelLayer('Sogamoso')}>Sogamoso</button>
                <button disabled onClick={() => this.props.innerPanelLayer('Nortechivor')}>Nortechivor</button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className="m0" id='daa'
              expanded= {subExpanded === 'DAA'}
              onChange={this.subHandleChange('DAA')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              Diagnóstico Ambiental de Alternativas
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="inlineb">
                <button disabled onClick={() => this.props.innerPanelLayer('San Fernando')}>San Fernando</button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className="m0" id='daa'
              expanded= {subExpanded === 'DAA'}
              onChange={this.subHandleChange('DAA')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              + Agregar nuevo proyecto
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="inlineb">
                <button disabled onClick={() => this.props.innerPanelLayer('San Fernando')}>San Fernando</button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className="m0" id="panel1-Occidente" disabled
          expanded= {expanded === 'Occidente'}
          onChange={this.handleChange('Occidente')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Occidente
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <ExpansionPanel className="m0" id="panel1-Suroccidente" disabled
          expanded= {expanded === 'Suroccidente'}
          onChange={this.handleChange('Suroccidente')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Suroccidente
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </div>
    );
  }
}

export default ProjectSelector;