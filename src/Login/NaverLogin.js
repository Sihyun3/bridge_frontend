<<<<<<< HEAD
import axios from 'axios'
import { useEffect } from 'react'

const NaverLogin = ({ setGetToken, setUserInfo }) => {


    const { naver } = window
    const NAVER_CLIENT_ID = '9i6fzGFoSxccJUEKZ46S'
    const NAVER_CALLBACK_URL = 'http://localhost:3000/3'

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            // 팝업창으로 로그인을 진행할 것인지?           
            isPopup: false,
            // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
            loginButton: { color: 'green', type: 3, height: 58 },
            callbackHandle: true
        })
        naverLogin.init()

        // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데  
        // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어  
        // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

        // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
        // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

        // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는 
        // 코드 생략이 가능하다.  

        naverLogin.getLoginStatus(async function (status) {
            if (status) {
                // 아래처럼 선택하여 추출이 가능하고, 
                const userEmail = naverLogin.user.getEmail()
                const username = naverLogin.user.getName()
                // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
                // setUserInfo(naverLogin.user)
                localStorage.setItem('userName', naverLogin.user.name);
                localStorage.setItem('userEmail', naverLogin.user.email);

                axios.post(`http://localhost:8080/api/bridge/pass/login`, { "userNickName": naverLogin.user.name })
                    .then((response) => {
                        if (response.data) {
                            sessionStorage.setItem("token", response.data);
                            alert('로그인 성공');
                            window.location.href = "/";

                        }
                        else {
                            sessionStorage.clear();
                            alert('로그인 실패');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        sessionStorage.clear();
                        alert('일치하는 정보가 없습니다.');
                    })

            }
        })
        // 요기!

        // localStorage.setItem('userName', naverLogin.username);
        // localStorage.setItem('userNickname', naverLogin.userid);
        // localStorage.setItem('userPhoto', naverLogin.user.profile_image);
    }



    // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 토큰이 붙어서 전달된다.
    // 우선 아래와 같이 토큰을 추출 할 수 있으며,
    // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

    const userAccessToken = () => {
        window.location.href.includes('access_token') && getToken()
    }

    const getToken = () => {
        const token = window.location.href.split('=')[1].split('&')[0]
        // console.log, alert 창을 통해 토큰이 잘 추출 되는지 확인하자! 

        // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!   
        // localStorage.setItem('access_token', token)
        // setGetToken(token)

    }


    // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
    useEffect(() => {
        initializeNaverLogin()
        userAccessToken()
    }, [])


    return (
        <>
            <div id="naverIdLogin" />
        </>
    )
}
=======
// import { useEffect } from "react";

// const NaverLogin = () => {
//     // window 객체로 부터 naver와 관련한 항목을 객체 비구조화로 추출
//     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     // index.html 페이지에 추가한 <script>에 의해서 설정
//     const { naver } = window;

//     // 네이버 개발자 사이트에 등록한 애플리케이션의 ID와 Callback URL을 상수로 정의
//     const NAVER_CLIENT_ID = `5chnMhfd1oStUPJr9rqa`;
//     const NAVER_CALLBACK_URL = `http://localhost:3000/login`;
<<<<<<< HEAD
=======
//     const NAVER_CLIENT_ID = `9i6fzGFoSxccJUEKZ46S`;
//     const NAVER_CALLBACK_URL = `http://localhost:3000`;
>>>>>>> 66271881008dd3f80a0abe0fedb0bab2d0ec78f4

//     // 네이버 로그인에 필요한 #1 값 설정, #2 초기화, 
//     // #3 로그인 결과를 반환하는 콜백 함수를 등록해 주는 함수
//     const initializeNaverLogin = () => {
//         // #1
//         const naverLogin = new naver.LoginWithNaverId({
//             clientId: NAVER_CLIENT_ID, 
//             callbackUrl: NAVER_CALLBACK_URL, 
//             isPopup: true, 
//             loginButton: { color: 'green', type: 3, height: 60 }
<<<<<<< HEAD
//             // loginButton: { color: 'green', type: 1, height: 60 }
=======
//             loginButton: { color: 'green', type: 1, height: 60 }
>>>>>>> 66271881008dd3f80a0abe0fedb0bab2d0ec78f4
//         });

//         // #2
//         naverLogin.init();
    
//         // #3
//         naverLogin.getLoginStatus(function (status) {
//             // 로그인 성공 시 true를 값으로 가짐
//             if (status) {
//                 // 로그인 성공 시 naverLogin의 user 객체에 있는 정보 중 
//                 // 필요한 정보를 로컬 스토리지에 저장
//                 localStorage.setItem('userName', naverLogin.user.name);
//                 localStorage.setItem('userNickname', naverLogin.user.nickname);
//                 localStorage.setItem('userPhoto', naverLogin.user.profile_image);
            
//                 // 부모 브라우저 창의 주소를 홈(/)으로 변경 후 
//                 // 팝업 브라우저 창을 닫음
//                 window.opener.location.href = "/";
//                 window.close();
//             } 
//         });
//     };    

//     // 최초 마운트 시 initializeNaverLogin 함수를 호출
//     useEffect(() => {
//         initializeNaverLogin();
//     }, []);

//     // 로그인 버튼을 출력(id는 고정된 값)
//     return <div id="naverIdLogin" />;
// };
>>>>>>> aa3092441a41ef062651ffbd8820f7aa306caed7

// export default NaverLogin;