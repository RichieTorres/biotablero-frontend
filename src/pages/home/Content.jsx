import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from 'app/AppContext';
import MenuButton from 'pages/home/content/MenuButton';
import CssCarousel from 'pages/home/content/CssCarousel';

import isFlagEnabled from 'utils/isFlagEnabled';

const Content = ({ activeModule, setActiveModule }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    isFlagEnabled('alertsModule')
      .then((value) => setShowAlert(value));
  }, []);

  const modules = [
    {
      focusCallback: () => setActiveModule('search'),
      buttonStyles: `finder geo ${(activeModule === 'search') ? 'activeicon' : ''}`,
      idBtn: 'geobtn',
      firstLineContent: 'consultas',
      secondLineContent: 'geográficas',
      localLink: '/Consultas',
      auth: false,
    },
    {
      focusCallback: () => setActiveModule('indicator'),
      buttonStyles: `finder ind ${(activeModule === 'indicator') ? 'activeicon' : ''}`,
      idBtn: 'indbtn',
      firstLineContent: 'indicadores de',
      secondLineContent: 'biodiversidad',
      localLink: '/Indicadores',
      auth: false,
    },
    {
      focusCallback: () => setActiveModule('compensation'),
      buttonStyles: `finder com ${(activeModule === 'compensation') ? 'activeicon' : ''}`,
      idBtn: 'combtn',
      firstLineContent: 'compensación',
      secondLineContent: 'ambiental',
      localLink: '/GEB/Compensaciones',
      auth: true,
    },
    {
      focusCallback: () => setActiveModule('portfolio'),
      buttonStyles: `finder port ${(activeModule === 'portfolio') ? 'activeicon' : ''}`,
      idBtn: 'portbtn',
      firstLineContent: '',
      secondLineContent: 'Portafolios',
      localLink: '/Portafolios',
      auth: false,
    },
  ];

  if (showAlert) {
    modules.push({
      focusCallback: () => setActiveModule('alert'),
      buttonStyles: `finder ale ${(activeModule === 'alert') ? 'activeicon' : ''}`,
      idBtn: 'alebtn',
      firstLineContent: 'alertas',
      secondLineContent: 'tempranas',
      localLink: '/Alertas',
      auth: false,
    });
  }
  modules.push({
    focusCallback: () => setActiveModule('cbmdashboard'),
    buttonStyles: `finder mon ${(activeModule === 'cbmdashboard') ? 'activeicon' : ''}`,
    idBtn: 'monbtn',
    firstLineContent: 'Monitoreo',
    secondLineContent: 'comunitario',
    localLink: '/Monitoreo',
    auth: false,
  });

  return (
    <AppContext.Consumer>
      {({ user }) => {
        let modulesArray = modules;
        if (!user) {
          modulesArray = modules.filter((module) => !module.auth);
        }
        return (
          <div className="finderline">
            <CssCarousel
              itemsArray={modulesArray.map((module) => (
                <MenuButton
                  focusCallback={module.focusCallback}
                  buttonStyles={module.buttonStyles}
                  idBtn={module.idBtn}
                  key={module.idBtn}
                  firstLineContent={module.firstLineContent}
                  secondLineContent={module.secondLineContent}
                  localLink={module.localLink}
                />
              ))}
            />
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

Content.propTypes = {
  activeModule: PropTypes.string,
  setActiveModule: PropTypes.func,
};

Content.defaultProps = {
  activeModule: 'search',
  setActiveModule: null,
};

export default Content;
