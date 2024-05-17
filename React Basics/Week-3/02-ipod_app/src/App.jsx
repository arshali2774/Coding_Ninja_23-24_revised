import { useState } from 'react';
import Controls from './components/Controls';
import Screen from './components/Screen';

const App = () => {
  const menuItems = ['Cover Flow', 'Music', 'Games', 'Settings'];
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [openMenuItem, setOpenMenuItem] = useState('');

  return (
    <div id='ipod-body'>
      <Screen
        selectedMenuItem={selectedMenuItem}
        menuItems={menuItems}
        openMenuItem={openMenuItem}
      />
      <Controls
        menuItems={menuItems}
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
        setOpenMenuItem={setOpenMenuItem}
      />
    </div>
  );
};
export default App;
