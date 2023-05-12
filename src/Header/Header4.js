import style from './Header4.module.css'
import { Route, Link } from 'react-router-dom';
import { Component, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

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






                            <li> <a style={{color:'white'}}>{userNickname}님  <button style={{ color: 'white' }} className={style.logout} onClick={handlerOnLogoutClick}>LOGOUT</button></a></li>

                        </ul>
                    </div>
                </div>

            </div>
        )
    } else {
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
                            <Link className={style.Login} to="/login">로그인</Link>
                            <Link className={style.regist} to="/4">회원가입</Link>

                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default Header4;