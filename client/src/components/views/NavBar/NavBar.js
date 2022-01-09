import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { auth, logoutUser } from '../../../_actions/user_action';
import './NavBar.css';

function NavBar() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const mounted = useRef(false);

  useEffect(() => {
    if(!mounted.current) {
      mounted.current = true;
    } else {
      dispatch(auth());
    }
  }, [dispatch, userState]);

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
      <div className='top-menu-item large-item menu-item-align-end'>
        {userState.userData !== undefined && userState.userData.isAuth ? (
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