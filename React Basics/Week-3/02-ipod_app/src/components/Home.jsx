/* eslint-disable react/prop-types */
import bg1 from '/bg1.jpg';
const Home = ({ menuItems, selectedMenuItem }) => {
  return (
    <div id='ipod_screen-home'>
      <div id='ipod_screen-home_left'>
        <p className='ipod_screen-home_heading'>iPod JS</p>
        {menuItems.map((item) => (
          <p
            key={item}
            className={`ipod_screen-home_item${
              selectedMenuItem === item ? ' selected' : ''
            }`}
          >
            <span>{item}</span>
            <i className='fa-solid fa-angle-right'></i>
          </p>
        ))}
      </div>

      <img src={bg1} alt='wallpaper' id='ipod_screen-home_right' />
    </div>
  );
};
export default Home;
