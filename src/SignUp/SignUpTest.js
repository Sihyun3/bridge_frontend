import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import style from './SignUpTest.module.css';
import { useRef } from 'react';
import React from 'react';
import { FaAngleDown } from "react-icons/fa";
import { FaAngleDown2 } from "react-icons/fa";
import BridgeBlackLogo from '../SignUp/BridgeBlackLogo.png';

const SignUpTest = ({ history, props }) => {
    const [dropdownVisibility, setDropdownVisibility] = React.useState(false);
    const [dropdownVisibility2, setDropdownVisibility2] = React.useState(false);
    //이름
    const [userName, setName] = useState();
    //아이디
    const [userId, setUserId] = useState();
    //닉네임
    const [userNickname, setNickName] = useState();
    //비밀번호
    const [userPassword, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    //연락처
    const [userPhoneNumber, setPhone] = useState();
    //이메일
    const [userEmail, setEmail] = useState();

    const [confirmMessage, setConfirmMessage] = useState();
    const [Pmessage, setPmassage] = useState();
    const [Emassage, setEmassage] = useState();
    const [verifyCode, setVerifyCode] = useState();
    const [verifyConfirmMessage, setVerifyConfirmMessage] = useState();
    const [tag, setTag] = useState([]);


    const handlerOnClick = e => {
        if (confirmMessage == null && Pmessage == null && Emassage == null && userId != null) {
            axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/regist`, {
                "userId": userId, "userPassword": userPassword, "userPhoneNumber": userPhoneNumber,
                "userEmail": userEmail, "userName": userName, "userNickname": userNickname
            })
                .then(response => {

                    alert('정상적으로 등록 되었습니다.')
                    history.push('/login')

                })
                .catch(error => {
                    alert('id, pw가 일치하지 않습니다')
                    console.log(error)
                    sessionStorage.clear();
                })
        } else {
            alert('형식이 일치하지 않습니다')
        }
    };

    const handlerOnClickForVerification = e => {
        if (e.target.value === verifyCode) {
            setVerifyCode(e.target.value)
            setVerifyConfirmMessage(null);
        } else {
            setVerifyCode(e.target.value);
            setVerifyConfirmMessage('인증에 실패했습니다. 다시 시도해주세요.')
        }
    };



    const handlerChangeNickName = e => {
        setNickName(e.target.value);
    }
    //핸들러 모음
    const handlerChangeName = e => {
        setName(e.target.value);
    };
    const handlerChangeUserId = e => {

        setUserId(e.target.value);
    };
    const handlerChangePassword = e => {
        setPassword(e.target.value);
    };
    const handlerChangeConfrimPassword = e => {
        if (e.target.value === userPassword) {
            setConfirmPassword(e.target.value)
            setConfirmMessage(null);
        } else {
            setConfirmPassword(e.target.value);
            setConfirmMessage('비밀번호가 일치하지 않습니다.')
        }
    };
    const changePhone = e => {
        if (/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(e.target.value)) {
            setPhone(e.target.value);
            setPmassage(null);
        } else {
            setPhone(e.target.value);
            setPmassage('번호 형식이 올바르지 않습니다.');
        }
    };

    const handlerChangeEmail = e => {
        if (/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(e.target.value)) {
            setEmail(e.target.value);
            setEmassage(null);
        } else {
            setEmail(e.target.value);
            setEmassage('이메일 형식이 올바르지 않습니다.');
        }

    };

    const handlerInstrument = (e) => {
        setTag([...tag, e.target.value])
    }


    // const dropDownRef = useRef();
    // const [mailIdentify, setMailIdentify] = useState('');
    // const mailAddress = ['naver.com' , 'daum.net', 'google.com']  // ['010', '011', '017', ...]

    // const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);



    //     <select className={style.signupinput} onChange={handleSelect}>
    //                         <option value="" disabled selected>포지션 선택</option>
    //                         <option value="작곡가">작곡가</option>
    //                         <option value="연주자">연주자</option>
    //                         <option value="작곡가 겸 연주자">작곡가 겸 연주자</option>
    //                     </select>
    // const handleSelect = (e) => {setSelect(e.target.value);};




    return (
        <>
            <div className='container clearfix'>
                <div className={style.wrapper}>
                    <div className={style.container}>
                        <div className={style.signUpContainer}>
                            <form className={style.form}>
                            <img className={style.BridgeBlackLogo} src={BridgeBlackLogo} alt='브릿지 로고'></img>

                                <div className={style.basicBox}>
                                <div className={style.line_or}>
                                    <span className={style.line_or_before} />
                                    <span className={style.txt_or}>회원가입</span>
                                    <span className={style.line_or_after} />
                                </div>
                                    <input className={style.formInput} type="Id" placeholder="아이디" onChange={handlerChangeUserId} />
                                    <input className={style.formInput} type="password" placeholder="비밀번호" onChange={handlerChangePassword} />
                                    <input className={style.formInput} type="password" placeholder="비밀번호 확인" onChange={handlerChangeConfrimPassword} />
                            
                                    {/* <div className={style.line_or}>
                                    <span className={style.line_or_before} />
                                    <span className={style.txt_or}>ㅇㅇㅇ</span>
                                    <span className={style.line_or_after} />
                                </div> */}
                                </div>
                                    <div>
                                    <input className={style.nameInput} type="text" placeholder="이름" onChange={handlerChangeName} />
                                    </div>

                                    
                                    {/* <input className={style.formInput} type="text" placeholder="닉네임" onChange={handlerChangeNickName} /> */}
         
                                <div className={style.NumberBox}>
                               
                                    <select className={style.selectNumberBox} onChange={handlerInstrument}>
                                        {/* <option value="number" disabled selected>010</option> */}
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="018">018</option>
                                    </select>
                                    <input className={style.NumberBoxInput} type="phoneNumber" placeholder="핸드폰 번호" onChange={changePhone} />
                                </div>
                                <div className={style.line_or}>
                                    <span className={style.line_or_before} />
                                    <span className={style.txt_or}>본인확인 이메일</span>
                                    <span className={style.line_or_after} />
                                </div>

                                <div className={style.MailBox}>
                                    <input  className={style.mailBoxInput}  type="email" placeholder="이메일" onChange={handlerChangeEmail} />
                                    <select  className={style.selectMailBox} onChange={handlerInstrument}>
                                        <option value="mail" disabled selected>e-mail</option>
                                        <option value="naver">naver.com</option>
                                        <option value="google">google.com</option>
                                        <option value="daum">daum.net</option>
                                    </select>
                                </div>
                                
                                <button className={style.CodeButton} onClick={handlerOnClickForVerification}>인증코드 요청</button>
                                
                                {/* <div ref={dropDownRef}>
                                            <input onClick={() => setIsOpen(!isOpen)} type='button' value={mailIdentify} />
                                            
                                            {isOpen &&
                                                <ul>
                                                    {mailAddress.map((value, index) => (
                                                        <MailDropDown key={index} value={value} setIsOpen={setIsOpen} setMailIdentify={setMailIdentify} isOpen={isOpen} />
                                                    ))}
                                                </ul>
	                                        }
                                        </div> */}
                                    <input className={style.formInput} type="email" placeholder="인증코드 확인" onChange={handlerChangeEmail} />
                                    {/* <button className={style.registrationButton} onClick={handlerOnClickForVerification}>확인 </button> */}
                                
                                {/* <input className={style.formInput} type="PINCODE" placeholder="인증번호를 입력하세요" onChange={changePhone} /> */}

                                <button className={style.registrationButton} onClick={handlerOnClick}>가입하기</button>

                                {/* <span className={style.span} >or use your SNS account for registration</span> */}
                                {/* <span className={style.span}>SNS 계정으로 간편가입</span> */}
                                {/* <div>
                                <KakaoLogin/>
                                <NaverLogin/>
                                <img type="button" className={style.sns} src={KakaotalkLogo} value="logo" onClick={KakaoLogin}/> 
                                <img type="button" className={style.sns} src={NaverLogo} value="logo" onClick={NaverLogin}/> 
                                </div> */}


                            </form>
                        </div>
                    </div>
                </div>
            </div>




            {/* <div className='container clearfix' >
                <div className={style.loginbackg}>
                    <h1 className={style.login}>회원 가입</h1>

                    <input className={style.signupinput} onChange={handlerChangeName} placeholder="이름을 입력해주세요." />
                    <input className={style.signupinput} onChange={handlerChangeNickName} placeholder="닉네임을 입력해주세요." />
                    <input className={style.signupinput} onChange={handlerChangeUserId} placeholder="아이디를 입력해주세요." />
                    <input className={style.signupinput} onChange={handlerChangeEmail} placeholder="이메일을 입력해주세요." />
                    <div>{Emassage}</div>

                    <input className={style.signupinput2} onChange={handlerChangePassword} placeholder="비밀번호를 8자 이상 입력해주세요." />

                    <input className={style.signupinput2} onChange={handlerChangeConfrimPassword} placeholder="비밀번호를 재입력해주세요." />
                    <div >{confrimMessage}</div>
                    <input className={style.signupinput2} onChange={changePhone} placeholder="전화번호를 입력해주세요." />
                    <div>{Pmessage}</div>
                    <br />
                    <button className={style.loginbutton} onClick={handlerOnClick}>회원 가입</button>
                    <p className={style.loginsns}>SNS로 가입하기</p>
                  <div className={style.kakao}>  <KakaoLogin/></div>
                    <div className={style.naver}><NaverLogin/></div>
                </div>
            </div> */}



        </>

    )
}

export default SignUpTest;