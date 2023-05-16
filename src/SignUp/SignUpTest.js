// import style from './SignUp.module.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
// import KakaoLogin from '../Login/KaKaoLogin';
// import NaverLogin from './NaverLogin';
// import style from './LoginTest2.module.css';
import style from './SignUpTest.module.css';
// import NaverLogo from './NaverLogo.png';
// import KakaotalkLogo from './KakaotalkLogo.png';
// import GoogleLogo from './GoogleLogo.png';
import { useRef } from 'react';
import React from 'react';
import { FaAngleDown } from "react-icons/fa";
import { FaAngleDown2 } from "react-icons/fa";
import BridgeBlackLogo from '../SignUp/BridgeBlackLogo.png';
import UnLock from './UnLock.png';
import Locked from './Locked.png';
import { click } from '@testing-library/user-event/dist/click';

const SignUpTest = ({ history, props }) => {
    const [dropdownVisibility, setDropdownVisibility] = React.useState(false);
    const [dropdownVisibility2, setDropdownVisibility2] = React.useState(false);
    //이름
    const [userName, setName] = useState();
    //아이디
    const [userId, setUserId] = useState();
    const [confirmId, setConfirmId] = useState();
    const [confirmIdMessage, setConfirmIdMessage] = useState();
    //닉네임
    const [userNickname, setNickName] = useState();
    //비밀번호
    const [userPassword, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [confirmMessage, setConfirmMessage] = useState();
    //연락처
    const [userPhoneNumber, setPhone] = useState();
    //이메일
    const [userEmail, setEmail] = useState();


    const [Pmessage, setPmassage] = useState();
    const [Emassage, setEmassage] = useState();
    const [verifyCode, setVerifyCode] = useState();
    const [verifyConfirmMessage, setVerifyConfirmMessage] = useState();
    const [tag, setTag] = useState([]);


    //새로 추가한 부분 
    const [select, setSelect] = useState("010");
    const [selectEmail, setSelectEmail] = useState("@bridge.com");
    const [userFrontNumber, setUserFrontNumber] = useState();
    const [userLastEmail, setUserLastEmail] = useState();


    const [auth, setAuth] = useState('');
    const [temp, setTemp] = useState('');

    const [insert, setInsert] = useState(0);
    const [userFirstEmail, setFirst] = useState('');


    const handleSelectFrontNumber = (e) => {

        setSelect(e.target.value);
    };
    // const handleFrontEmail = (e) => { setFrontEmail(e.target.value); };

    // const handleSubmit = () => {
    //     let datas = {
    //         userPhoneNumber,
    //         userEmail,
    //         "userFrontNumber": select + userPhoneNumber,
    //         "userLastEmail": userEmail + selectEmail,
    //     };
    // }

    useEffect(() => {
        let frontmail = userFirstEmail + selectEmail;

        if (/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(frontmail)) {
            setEmail(frontmail);
            console.log(frontmail);
            setEmassage(null);

        } else {
            setEmail(userFirstEmail);
            setEmassage('이메일 형식이 올바르지 않습니다.');
        }


    }, [insert])






    const handlerOnClick = e => {
        if (confirmMessage == null && Pmessage == null && Emassage == null && userId != null) {
            axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/regist`, {
                "userId": userId, "userPassword": userPassword, "userPhoneNumber": select + userPhoneNumber,
                "userEmail": userEmail + selectEmail, "userName": userName, "userNickname": userNickname
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


    //ID 중복체크
    const userIdCheck = (e) => {
        e.preventDefault();
        console.log("asjsdfjfkds")
        axios.post(`http://192.168.0.47:8080/api/idlist/${userId}`,)
            .then(response => {
                console.log(response.data);
                const data = response.data;
                if (data === 1) {
                    alert("이미 사용중인 아이디입니다.");
                    setConfirmIdMessage("이미 사용중인 아이디입니다.");
                } else if (data === 0) {

                    alert("사용 가능한 아이디입니다.");
                    setConfirmIdMessage("탁월한 선택이십니다.");
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handlerAuth = () => {
        // axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/emailConfirm/${userEmail}`)
        axios.post(`http://192.168.0.47:8080/emailConfirm/${userEmail}`)
            .then((r) => {
                console.log(r.data)
                setAuth(r.data)
                alert("인증번호가 발송되었습니다.")
            })
            .catch(() => {
                alert("오류가 발생하였습니다.")
            })
    }

    const handlerCheck = () => {
        if (auth == temp) {
            // axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/emailConfirm/${userEmail}`)
            axios.post(`http://192.168.0.47:8080/emailConfirm/${userEmail}`)
                .then((r) => {
                    alert("인증이 성공적으로 완료되었습니다.");
                })
        } else {
            alert("인증번호가 일치하지 않습니다.");
        }
    }


    // const handlerOnClickForVerification = e => {
    //     if (e.target.value === verifyCode) {
    //         setVerifyCode(e.target.value)
    //         setVerifyConfirmMessage(null);
    //     } else {
    //         setVerifyCode(e.target.value);
    //         setVerifyConfirmMessage('인증에 실패했습니다. 다시 시도해주세요.')
    //     }
    // };



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



    const handlerChangeConfirmId = e => {
        if (e.target.value === userId) {
            setConfirmId(e.target.value)
            setConfirmIdMessage("이미 사용중인 아이디입니다.");
        } else {
            setConfirmId(e.target.value);
            setConfirmIdMessage(null);
        }
    };



    const handlerChangeConfirmPassword = e => {
        if (e.target.value === userPassword) {
            setConfirmPassword(e.target.value)
            setConfirmMessage(null);
        } else {
            setConfirmPassword(e.target.value);
            setConfirmMessage('비밀번호가 일치하지 않습니다.')
        }
    };

    const changePhone = e => {
        let number = select + "-" + e.target.value;
        // console.log(select);
        if (/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/.test(number)) {
            // if (/^(select)-(?:\d{3}|\d{4})-\d{4}$/.test(e.target.value)) {
            setPhone(number);
            setPmassage(null);
            console.log(number);
        } else {
            setPhone(e.target.value);
            setPmassage('번호 형식이 올바르지 않습니다.');
        }
    };
    const handleSelectLastEmail = (e) => {
        setInsert(insert + 1);
        setSelectEmail(e.target.value);
    };


    const handlerChangeEmail = e => {
        // let frontmail =  e.target.value + selectEmail;  
        setFirst(e.target.value);

        // if (/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(frontmail)) {
        //     setEmail(frontmail);
        //     console.log(frontmail);
        //     setEmassage(null);

        // } else {
        //     setEmail(e.target.value);
        //     setEmassage('이메일 형식이 올바르지 않습니다.');
        // }

    };


    const [hidePassword, setHidePassword] = useState(true);
    // const [showLockedButton, setShowLockedButton] = useState(true);
    const [src, setSrc] = useState(UnLock);
    const toggleHidePassword = () => {
        setHidePassword(!hidePassword)
        if (!hidePassword) {
            setSrc(!UnLock);
        } else {
            setSrc(Locked);
        }
    }

    const [hidePassword2, setHidePassword2] = useState(true);
    // const [showLockedButton, setShowLockedButton] = useState(true);
    const [src2, setSrc2] = useState(UnLock);
    const toggleHidePassword2 = () => {
        setHidePassword2(!hidePassword2)
        if (!hidePassword2) {
            setSrc2(!UnLock);
        } else {
            setSrc2(Locked);
        }
    }



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
                                </div>

                                <div className={style.idBox}>
                                    <div className={style.basicBox2}>
                                        <input className={style.idInputBox} type="Id" placeholder="아이디" onChange={handlerChangeUserId} />
                                        <button className={style.idCheckButton} onClick={userIdCheck}>ID 중복확인</button>
                                        <div>
                                            <span type="Id" name="Id" value={confirmId} onChange={(e) => {
                                                setConfirmId(e.target.value)
                                            }} onBlur={handlerChangeConfirmId} />

                                            {
                                                confirmIdMessage != null && <div className={style.warningMessage}> {confirmIdMessage}</div>
                                            }

                                        </div>
                                    </div>

                                </div>
                                <div className={style.basicBox}>
                                    <label>
                                    <img type="Button" className={style.Locked} src={src ? UnLock : Locked} value={Locked} onClick={toggleHidePassword} />
                                    <input className={style.formInput} type={hidePassword ? "password" : "text"} placeholder="비밀번호" onChange={handlerChangePassword} required maxLength={8} />
                                    </label>
                                    <label>
                                    <img type="Button" className={style.Locked2} src={src2 ? UnLock : Locked} value={Locked} onClick={toggleHidePassword2} />        
                                    <input className={style.formInput} type={hidePassword2 ? "password" : "text"} placeholder="비밀번호 확인" onChange={handlerChangeConfirmPassword} required maxLength={8} />
                                    </label>       




                                </div>
                                <div className={style.warningBox}>
                                    <span type="password" name="password" value={confirmPassword} className={style.txt_or} onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                    }} onBlur={handlerChangeConfirmPassword} />

                                    {
                                        confirmMessage != null && <div className={style.pwWarningMessage}> {confirmMessage}</div>
                                    }

                                </div>



                                <div>
                                    <input className={style.nameInput} type="text" placeholder="이름" onChange={handlerChangeName} />
                                </div>
                                <div className={style.NumberBox}>

                                    <select className={style.selectNumberBox} onChange={handleSelectFrontNumber}>
                                        {/* <option value="number" disabled selected>010</option> */}
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="018">018</option>
                                    </select>
                                    <input className={style.NumberBoxInput} type="phoneNumber" placeholder="핸드폰 번호 ex 0000-0000" onBlur={changePhone} />
                                </div>
                                <div className={style.line_or}>
                                    <span className={style.line_or_before} />
                                    <span className={style.txt_or}>본인확인 이메일</span>
                                    <span className={style.line_or_after} />
                                </div>

                                <div className={style.MailBox}>
                                    <input className={style.mailBoxInput} type="email" placeholder="이메일" onChange={handlerChangeEmail} />
                                    <select className={style.selectMailBox} value={selectEmail} onChange={handleSelectLastEmail}>
                                        {/* <option value="mail" disabled selected>e-mail</option> */}
                                        <option value="@bridge.com">bridge.com</option>
                                        <option value="@naver.com">naver.com</option>
                                        <option value="@gmail.com">gmail.com</option>
                                        <option value="@daum.net">daum.net</option>
                                    </select>
                                </div>
                                {console.log(">>>>>>>>>>>>>" + userEmail)}
                                <button className={style.CodeButton} onClick={handlerAuth}>인증코드 요청</button>
                                <div className={style.idBox}>
                                    <input className={style.idInputBox} type="email" placeholder="인증코드 입력" value={temp} onChange={(e) => { setTemp(e.target.value) }} />
                                    <button className={style.idCheckButton} onClick={handlerCheck}>코드 인증</button>
                                    {/* <button className={style.registrationButton} onClick={handlerOnClickForVerification}>확인 </button> */}
                                </div>
                                {/* <input className={style.formInput} type="PINCODE" placeholder="인증번호를 입력하세요" onChange={changePhone} /> */}

                                <button className={style.registrationButton} onClick={handlerOnClick}>가입하기</button>
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