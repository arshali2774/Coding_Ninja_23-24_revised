import { Link, NavLink, Outlet } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/3176/3176363.png'
          alt='logo'
          onClick={() => window.location.replace('/')}
        />

        <nav>
          {/* use NavLink inplace of Link to set the style to the active links */}
          <NavLink
            style={({ isActive }) => {
              return {
                border: isActive && '2px solid #fff',
                backgroundColor: isActive && 'rgba(225,209,249,0.463)',
              };
            }}
            to='/'
          >
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                border: isActive && '2px solid #fff',
                backgroundColor: isActive && 'rgba(225,209,249,0.463)',
              };
            }}
            to='/list'
          >
            List
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                border: isActive && '2px solid #fff',
                backgroundColor: isActive && 'rgba(225,209,249,0.463)',
              };
            }}
            to='/contact'
          >
            Contact
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};
