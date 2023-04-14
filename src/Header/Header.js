
import style from './Header.module.css';
import React, { useState } from 'react';



function Header({ nickname }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    function handleLogin() {
      setIsLoggedIn(true);
    }
  
    function handleLogout() {
      setIsLoggedIn(false);
    }
        return (
            <>
                <header className={style.header}>
                    <div className={style.contents}>
                    <div>
                        LOGO
                    </div>

                    <nav className={style.navigation}>
                        <ul>
                            <li>
                                가입하기
                            </li>
                            <li>
                                로그인
                            </li>
                        </ul>
                    </nav>


                </div>
                </header>
            </>

        )
    }

    export default Header;