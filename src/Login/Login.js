import style from './Login.module.css';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import KakaoLogo from  './KakaoLogo.png';
import NaverLogo from './NaverLogo.png';
import KakaoLogin from './KaKaoLogin';
import NaverLogin from '../NaverLogin';
// import {KAKAO_AUTH_URL} from '../Login/KaKaoLogin';





const Login = () => {
    useEffect(() => {
        // 로컬 스토리지에 userName이 존재하는 경우 로그인한 것으로 판단
        // 이미 로그인한 경우 홈(/)으로 이동
        const isLogin = !!window.localStorage.getItem('userName');
        if (isLogin) {
            window.location.href = '/';
        }
    }, []);

    useEffect(() => {
        const isLogin = !!window.localStorage.getItem('userName');
        if (isLogin) {
            window.location.href='/';
        }})

    return (
        <>
            <div className={style.loginbackg}>
                <h1 className={style.login}>로그인</h1>

                <p className={style.loginp}>아이디</p>
                <input className={style.logininput} />
                <p className={style.loginp}>비밀번호</p>
                <input className={style.logininput} />
                <br />
                <button className={style.loginbutton}>로그인</button>
                <Link to="/signup"><p className={style.signup}>회원가입</p></Link>
                <p className={style.loginsns}>SNS계정 간편 로그인</p>
                <div className={style.naver}><KakaoLogin /></div>
                {/* <a href={KAKAO_AUTH_URL}>카카오로 로그인하기</a> */}
                <div className={style.naver}><NaverLogin/></div>
            </div>
        </>

    )
}


export default Login;