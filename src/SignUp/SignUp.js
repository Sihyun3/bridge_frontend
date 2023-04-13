import style from './SignUp.module.css';
import { Link } from 'react-router-dom';
import KakaoLogo from '../Login/KakaoLogo.png';
import NaverLogo from '../Login/NaverLogo.png';

const SignUp = () => {
    return (
        <>
            <div className='container clearfix' >
                <div className={style.loginbackg}>
                    <h1 className={style.login}>회원 가입</h1>
 
                    <input className={style.signupinput} placeholder="이름을 입력해주세요." />
                    <input className={style.signupinput} placeholder="닉네임을 입력해주세요." />
                    <input className={style.signupinput} placeholder="아이디를 입력해주세요." />
                    <input className={style.signupinput} placeholder="이메일을 입력해주세요." />
                    <input className={style.signupinput2} placeholder="비밀번호를 8자 이상 입력해주세요." />
                    <input className={style.signupinput2} placeholder="비밀번호를 재입력해주세요." />
                    <input className={style.signupinput2} placeholder="전화번호를 입력해주세요."/>
                    <br />
                    <button className={style.loginbutton}>로그인</button>
                    <p className={style.loginsns}>SNS로 가입하기</p>
                    <img className={style.logo} src={KakaoLogo} />
                    <img className={style.logo} src={NaverLogo} />
                </div>
            </div>
        </>

    )
}

export default SignUp;