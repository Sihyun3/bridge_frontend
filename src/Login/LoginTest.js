import style from './LoginTest.module.css';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import KakaoLogin from '../Login/KaKaoLogin';
import NaverLogin from './NaverLogin';
import { useState } from "react";
import axios from "axios";
// import {KAKAO_AUTH_URL} from './LoginTest/KaKaoLogin';
import { useHistory } from 'react-router-dom';


const LoginTest = ({ setIsLogin }) => {

    //이름
    const [userName, setName] = useState();
    //아이디
    // const [userId, setUserId] = useState();
    //닉네임
    const [userNickname, setNickName] = useState();
    //비밀번호
    const [user1Password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    //연락처
    const [userPhoneNumber, setPhone] = useState();
    //이메일
    const [userEmail, setEmail] = useState();

    const [confrimMessage, setConfrimMessage] = useState();
    const [Pmessage, setPmassage] = useState();
    const [Emassage, setEmassage] = useState();



    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const history = useHistory();
    const handlerOnClick = e => {
        e.preventDefault();
        axios.post(`http://localhost:8080/login`,
            { "userId": userId, "userPassword": userPassword })
            .then(response => {
                if (response.data) {
                    alert('정상적으로 로그인되었습니다');
                    console.log(response);
                    console.log(history)
                    sessionStorage.setItem("token", response.data);
                    setIsLogin(true);
                    history.push('/');
                }
            })
            .catch(error => {
                alert('id, pw가 일치하지 않습니다')
                console.log(error)
                sessionStorage.clear();
            })
    };

    const handlerOnClick2 = () => {
        history.push('/27');
    };

    return (
        <>

            <div className='container clearfix'>
                <div className={style.wrapper}>
                    <div className={style.container}>
                        <div className={style.signUpContainer}>
                            <form className={style.form}>
                                <h1 className={style.formH1}>Login</h1>
                                <input className={style.formInput} type="Id" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} />
                                <input className={style.formInput} type="password" placeholder="비밀번호" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                                <button className={style.loginButton} onClick={handlerOnClick}>로그인</button>

                                <div className={style.find}>
                                    <button className={style.registration} onClick={''}>아이디찾기</button>
                                    <button className={style.registration} onClick={''}>비밀번호 찾기</button>
                                </div>

                                <div className={style.line_or}>
                                    <span className={style.line_or_before} />
                                    <span className={style.txt_or}>사용중인 계정이 없다면?</span>
                                    <span className={style.line_or_after} />
                                </div>
                                <button className={style.registrationButton} onClick={handlerOnClick2}>회원가입</button>
                                {/* <button className={style.formBtn} > <Link to="/27" /> </button> */}

                                {/* <div>
                                <Link to="/27" type="button" className={style.registrationButton}>회원가입</Link>  
                                </div> */}

                                <span className={style.span2}>SNS 계정으로 간편로그인</span>
                                <div>
                                    <div className={style.kakaoBtn}>
                                        <KakaoLogin />
                                    </div>
                                    <div className={style.naverBtn}>
                                        <NaverLogin />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>




            {/* 

            <div className='container clearfix' >
                <div className={style.loginbackg}>
                    <h1 className={style.login}>로그인</h1>

                <p className={style.loginp}>아이디</p>
                <input type="text" className={style.logininput} placeholder="아이디를 입력하세요" value={userId} onChange={(e)=>setUserId(e.target.value)}/>
                <p className={style.loginp}>비밀번호</p>
                <input type="password" className={style.logininput} placeholder="비밀번호를 입력하세요" value={userPassword} onChange={(e)=>setUserPassword(e.target.value)}/>
                <br />
                <button className={style.loginbutton} onClick={handlerOnClick}>로그인</button>
                <Link to="/5"><p className={style.signup}>회원가입</p></Link>
                <p className={style.loginsns}>SNS계정 간편 로그인</p>
               <div className={style.kakao}> <KakaoLogin /></div>
                <div className={style.naver}><NaverLogin /></div>
            </div>
            </div> */}
        </>
    );
}


export default LoginTest;

