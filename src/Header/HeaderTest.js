import styles from './HeaderTest.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';



function HeaderTest({ nickname }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    function handleLogin() {
      setIsLoggedIn(true);
    }
  
    function handleLogout() {
      setIsLoggedIn(false);
    }
  
    return (
      <div className={styles.header}>
        <h1>LOGO</h1>  
        {/* <Link to="/Main">LOGO</Link> */}
        {isLoggedIn ? (
          <div className={styles['profile-dropdown']}>
            <button className={styles['profile-button']}>{nickname}</button>
            <div className={styles['dropdown-menu']}>
              <a href="/profile">Profile</a>
              <a href="/settings">Settings</a>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className={styles['login-register']}>
            <button onClick={handleLogin}>Login</button>
            <button>Register</button>
            {/* <Link to="/login">Login</Link> */}
          {/* <Link to="/register">Register</Link> */}
          </div>
        )}
      </div>
    );
  }

  export default HeaderTest;