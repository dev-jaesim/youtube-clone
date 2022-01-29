import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../_actions/user_action';
import './NavBar.css';

function NavBar() {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser())
      .then(response => {
        if(response.payload.success) {
          navigate('/', { replace: true });
        }
      });
  }

  return (
    <div className='top-menu-bar'>
      <div className='top-menu-item menu-item-align-middle'>
        <Link to='/'>
          <span>Logo</span>
        </Link>
      </div>
      <div className='top-menu-item menu-item-align-middle'>
        Vidoes
      </div>
      <div className='top-menu-item menu-item-align-middle'>
        Subscription
      </div>
      <div className='top-menu-item menu-item-align-middle'>
        <Link to='/video/upload'>
          <span>Upload</span>
        </Link>
      </div>
      <div className='top-menu-item large-item menu-item-align-end'>
        {userState.userData?.isAuth ? (
            <span onClick={logout} className='logout'>
              Logout
            </span>
          ) : (
            <Link to='/login'>
              <span>Login</span>
            </Link>
          )}
      </div>
    </div>
  );
}

export default NavBar;