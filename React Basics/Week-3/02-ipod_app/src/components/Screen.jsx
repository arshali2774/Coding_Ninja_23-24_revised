/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import Home from './Home';
import CoverFlow from './CoverFlow';
import Music from './Music';
import Games from './Games';
import Setting from './Setting';

const Screen = ({ selectedMenuItem, menuItems, openMenuItem }) => {
  return (
    <div id='ipod-screen'>
      {openMenuItem === '' && (
        <Home selectedMenuItem={selectedMenuItem} menuItems={menuItems} />
      )}
      {openMenuItem === 'Cover Flow' && <CoverFlow />}
      {openMenuItem === 'Music' && <Music />}
      {openMenuItem === 'Games' && <Games />}
      {openMenuItem === 'Settings' && <Setting />}
    </div>
  );
};
export default Screen;
