import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";

// const KakaoLogin = ({history}) => {

// // const REST_API_KEY = "~~";
// // const REDIRECT_URI =  "http://localhost:3000/auth/kakao/callback";

// // export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


const KakaoLogin = ({ }) => {
    const { Kakao } = window;

    const JAVASCRIPT_APP_KEY = '68aeb9a371fc365c535495a103132163';

    // 액세스 토큰을 상태 변수로 선언 
    // 로그인 버튼 출력 제어에 사용
    const [accessToken, setAccessToken] = useState('');
    const [userName, setUserName] = useState('');
    const [userNickName, setUserNickName] = useState('');


    const handlerLogin = () => {
        // 간편 로그인을 요청
        // 인증 성공 시 redirectUri 주소로 인가 코드를 전달

        Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/3'
        });
    };

        useEffect(() => {

            Kakao.init(JAVASCRIPT_APP_KEY);

    // 쿼리 스트링으로 부터 인가 코드를 추출
    const code = window.location.search.split('=')[1];
    if (code) {
        // REST API로 토큰 받기를 요청
        axios.post(
            'https://kauth.kakao.com/oauth/token', {
            grant_type: 'authorization_code',                   // 고정
            client_id: JAVASCRIPT_APP_KEY,                      // 앱 REST API 키
            redirect_uri: 'http://localhost:3000/3',   // 인가 코드가 리다이렉트된 URI
            code: code                                          // 인가 코드 받기 요청으로 얻은 인가 코드
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }
        )
            .then(response => {

                console.log(response)

                const accessToken = response.data.access_token;         // 사용자 액세스 토큰 값
                setAccessToken(accessToken);

                // 액세스 토큰 값을 할당
                Kakao.Auth.setAccessToken(accessToken);
                console.log(accessToken);

                // 사용자 정보 가져오기
                Kakao.API.request({
                    url: '/v2/user/me'
                })
                    .then(response => {
                        // 사용자 정보 로깅
                        console.log(response);

                        // 애플리케이션에서 필요한 정보를 추출해서 로컬 스토리지에 저장
                        const { kakao_account } = response;
                        // console.log(kakao_account);

                        sessionStorage.setItem('userNickName', kakao_account.profile.nickname);
                        // localStorage.setItem('userName', kakao_account.profile.nickname);
                        // localStorage.setItem('userPhoto', kakao_account.profile.profile_image_url);
                        // sessionStorage.setItem('userPhoneNumber', kakao_account.phone.number);

                        // accesstoken 저장
                        sessionStorage.setItem('accessToken', accessToken);

                        axios.post(`http://localhost:8080/api/bridge/pass/login`, { "userNickName": kakao_account.profile.nickname })
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
                        // history.push('/');
                        // 홈(/) 화면으로 이동
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => console.log(error));
    }
}, []);
}

//         // 쿼리 스트링으로 부터 인가 코드를 추출
//         const code = window.location.search.split('=')[1];
//         if (code) {
//             // REST API로 토큰 받기를 요청
//             axios.post(
//                 'https://kauth.kakao.com/oauth/token', {
//                     grant_type: 'authorization_code',                   // 고정
//                     client_id: JAVASCRIPT_APP_KEY,                      // 앱 REST API 키
//                     redirect_uri: 'http://localhost:3000',   // 인가 코드가 리다이렉트된 URI
//                     code: code                                          // 인가 코드 받기 요청으로 얻은 인가 코드
//                 }, {
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//                     }
//                 }
//             )
//             .then(response => {
//                 const accessToken = response.data.access_token;         // 사용자 액세스 토큰 값
//                 setAccessToken(accessToken);

//                 // 액세스 토큰 값을 할당
//                 Kakao.Auth.setAccessToken(accessToken);

//                 // 사용자 정보 가져오기
//                 Kakao.API.request({
//                     url: '/v2/user/me'
//                 })
//                 .then(response => {
//                     // 사용자 정보 로깅
//                     console.log(response);

//                     // 애플리케이션에서 필요한 정보를 추출해서 로컬 스토리지에 저장
//                     const { kakao_account } = response;
//                     // console.log(kakao_account);
//                     localStorage.setItem('userName', kakao_account.profile.userName);
//                     localStorage.setItem('userNickname', kakao_account.profile.nickname);
//                     localStorage.setItem('userPhoto', kakao_account.profile.profile_image_url);
//                     // localStorage.setItem('userPhoneNumber', kakao_account.profile.phonenumber)
//                     // accesstoken 저장
//                     localStorage.setItem('accessToken', accessToken);

//                     setUserName(localStorage.userName);
//                     setUserNickName(localStorage.userNickname);

//                     // 홈(/) 화면으로 이동
//                     window.location.href = "/";
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 });
//             })
//             .catch(error => console.log(error));          
//         }
//     }, []);


//     const passInformation = (e) => {

//         e.preventDefault();
//         axios.post(`http://localhost:8080/api/bridge/pass/login`,
//         {userName, userNickName})
//         .then((response) => {
//             if(response.data) {
//                 localStorage.setItem("information", response.data);
//                 alert('로그인 성공')
//                 history.push('/');
//             } else {
//                 localStorage.clear();
//                 alert('로그인 실패');
//             }
//         })
//     }




return (
    <>
        {/* https://developers.kakao.com/tool/resource/login */}
        {!accessToken &&
            <img style={{ width: 277, height: 60, cursor: 'pointer' }}
                src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png"
                onClick={handlerLogin} />
        }
    </>
);
export default KakaoLogin;

//     return (
//         <>
//             {/* https://developers.kakao.com/tool/resource/login */}
//             <form onSubmit={passInformation}>
//             { !accessToken &&
//                 <img style={{width: 277, height: 60, cursor: 'pointer'}}
//                      src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png"
//                      onClick={handlerLogin} />
//             }
//             <button type="submit">로그인 정보 넘기기</button>
//             </form>
//         </>
//     );
// };

// export default KakaoLogin;

