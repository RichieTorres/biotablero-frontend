import React from 'react';
import Menu from './header/Menu';
import Title from './header/Title';
import Uim from './header/Uim';
import './assets/main.css';

class Header extends React.Component {
  render() {
    return (
		  <header className="cabezote">
          <div>
            <nav>
                <Menu />
            </nav>
            <Title title='BioTablero' subTitle='Prueba'/>
          </div>
          {/*TODO: Crear componente para manejo de usuarios,
             con actualización de la imagen y usuario en el
             Header en la página */}
          <Uim value='Uim'/>
		  </header>
    );
  }
}

export default Header;
