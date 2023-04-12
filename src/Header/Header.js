import { Link } from 'react-router-dom';
import style from './Header.module.css';


    const Header = () => {
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