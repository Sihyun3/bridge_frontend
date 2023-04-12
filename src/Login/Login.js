import style from './Login.module.css';
import { Link } from 'react-router-dom';
import KakaoLogo from  './KakaoLogo.png';
import NaverLogo from './NaverLogo.png';

const Login = () => {
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
                <img className={style.logo} src={KakaoLogo}/>
                <img className={style.logo} src={NaverLogo}/>
            </div>
        </>

    )
}

export default Login;