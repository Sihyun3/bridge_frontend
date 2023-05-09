import style from './Header4.module.css'
import { Route, Link } from 'react-router-dom';

function Header4() {
    return (
        <div className={style.Header}>
            <div className={style.navContainer}>
                <div className={style.leftContents}>
                    <ul className={style.leftMenu}>
                        <li className={style.Lefts}>
                            <Link to="/1">   <a>LOGO</a></Link>
                        </li>
                        <li className={style.Lefts}>
                            <Link to="/">  <a>음원 분리</a></Link>
                        </li>
                        <li className={style.Lefts}>
                            <Link to="/8">   <a>합주</a></Link>
                        </li>
                        <li className={style.Lefts}>
                            <Link to="/13">    <a>팁</a></Link>
                        </li>




                
                        <li>
                        <Link className={style.loginlink} to ="/3"><a className={style.Login}>로그인
                                {/* <svg>arrow</svg> /}
                        </a>
                        <a className={style.SignUp}> 가입하기
                            {/ <svg>arrow</svg> */}
                            </a></Link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Header4;