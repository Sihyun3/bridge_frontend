import style from './Header4.module.css'
import { Route, Link } from 'react-router-dom';
import { Component, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import BridgeWhiteLogo from '../Header/BridgeWhiteLogo.png'

function Header4({ isLogin, setIsLogin }) {

    const [state, setState] = useState(false);
    const [userNickname, setUserNickname] = useState('');

    const handlerOnLogoutClick = () => {
        alert("로그아웃되었습니다.");
        sessionStorage.clear();
        setIsLogin(false);
    }

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) {
            console.log("aaaaaaaaaaaaaa");
            const token = sessionStorage.getItem('token');
            const decodedToken = jwt_decode(token);
            console.log(decodedToken)
            setUserNickname(decodedToken.name);
            console.log(userNickname);
            setIsLogin(true);
        }
    }, [isLogin])

    if (isLogin) {
        return (
            <div className={style.Header}>
                <Link to="/">   <img src={BridgeWhiteLogo} /> </Link>
                <div className={style.navContainer}>

                    <div className={style.leftContents}>
                        <ul className={style.leftMenu}>

                            <li className={style.Lefts}>
                                <Link to="/bridge/split">  <a>음원 분리</a></Link>
                            </li>
                            <li className={style.Lefts}>
                                <Link to="/bridge/jam/list">   <a>합주</a></Link>
                            </li>
                            <li className={style.Lefts}>
                                <Link to="/bridge/tip/list">    <a>팁</a></Link>
                            </li>




                            <li><a><button className={style.logout} onClick={handlerOnLogoutClick} >LOGOUT</button></a></li>
                            <div className={style.box}>
                                <li> <a className={style.nickname}>{userNickname}님</a></li>
                                <div className={style.drop}>
                                    <Link to="/bridge/profile/detail">프로필</Link>
                                    <Link to="/bridge/partner/doing">작업페이지</Link>
                                    <Link to="/bridge/chatting">채팅</Link>

                                </div>
                            </div>


                        </ul>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div className={style.Header}>
                <Link to="/1">   <img src={BridgeWhiteLogo} /> </Link>
                <div className={style.navContainer}>
                    <div className={style.leftContents}>
                        <ul className={style.leftMenu}>

                            <li className={style.Lefts}>
                                <Link to="/bridge/split">  <a>음원 분리</a></Link>
                            </li>
                            <li className={style.Lefts}>
                                <Link to="/bridge/jam/list">   <a>합주</a></Link>
                            </li>
                            <li className={style.Lefts}>
                                <Link to="/bridge/tip/list">    <a>팁</a></Link>
                            </li>
                            <Link className={style.Login} to="/bridge/login">로그인</Link>
                            <Link className={style.regist} to="/signup">회원가입</Link>



                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default Header4;