// 헤더 풋터
import Header2 from './Header/Header2';
import Footer from './Footer/Footer';
//페이지 임포트
import LoginStart from './Login/LoginStart';
import Main from './Main/Main';
import Notice from './Admin-Notice/Notice';
import Login from './Login/Login';
import ReportPage from './Report/ReportPage';
import SignUp from './SignUp/SignUp';
import TipList from './Tip/TipList';
import ReportDetail from './Admin-Report/ReportDetail';
import ProfileDetail from './Profile/ProfileDetail';
import JamList from './Jam/Jamlist';
import Doing from './Doing/Doing';
import Charge from './Charge/Charge';
import DealListAd from './Administrator/DealListAd';
import MainAd from './Administrator/MainAd';
import PartnerWrite from './Partner/PartnerWrite';
import Payment from './Payment/Payment';
import Chatting from './Chatting/Chatting';
import ProfileWrite from './Profile/ProfileWrite';
import JamWrite from './Jam/JamWrite';
<<<<<<< HEAD
import { useState } from 'react';
// import { Routes } from 'react-router-dom';
// import Header2 from './Header/Header2';
import { Route } from 'react-router-dom';
import KakaoLogin from './Login/KaKaoLogin';
import JamDetail from './Jam/JamDetail';
import Content from './Doing/Content.js';
import ContentUpdate from './Doing/ContentUpdate';
// import ContentUpdate from './Doing/ContentUpdate';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // 로그인 페이지로 이동
  const handlerLogin = (e) => {
    e.preventDefault();
    window.location.href = '/3';
  };

    // 로그아웃 처리 
  // 로그아웃 처리 
  // 로컬 스토리지 내용 삭제 후 홈(/)으로 이동
  const handlerLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  };

    // 로그인 페이지가 아닌 경우 로그인/로그아웃 버튼을 제공
  // 로그인 페이지가 아닌 경우 로그인/로그아웃 버튼을 제공
  // 로그인 상태인 경우 로그인 정보와 로그아웃 버튼을 
  // 로그아웃 상태인 경우 로그인 버튼을 제공
  const isNotLoginPage = window.location.pathname === '/3' ? false : true;
  // const isLogin = !!window.localStorage.getItem('userName');


=======
import NoticeWrite from './Admin-Notice/NoticeWrite';
import NoticeDetail from './Admin-Notice/NoticeDetail';
import TipWrite from './Tip/TipWrite'
import JamDetail from './Jam/JamDetail';
import JamDetail2 from './Jam/JamDetail2';
import MusicSplit from './MusicSplit/MusicSplit';
import ReportList from './Admin-Report/ReportList';
import ReportDetail from './Admin-Report/ReportDetail';
import TipEdit from './Tip/TipEdit'
import TipDetail from './Tip/TipDetail'

import { useEffect,useState } from 'react';
import { Route } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(false);
     useEffect(()=>{
      sessionStorage.setItem("token",	"eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInN1YiI6InRlc3QiLCJqdGkiOiJkMjE3ZmQ0Ny1kYWUwLTQ0OGEtOTQwNy1mYWE1NjY2OTQ3NWIiLCJpYXQiOjE2ODI1ODY1MjgsImV4cCI6ODY0MDE2ODI1ODY1Mjh9.nEvZzgu8d0J4yfTaQ1Ea3oPUL-LQBH7aIv-JVxgF78o");
     },[])
>>>>>>> b7ba2cdb6019baca0a57afcb019b3cd69641535f
     
    
  return (
    <>
<<<<<<< HEAD
      {/* <Header2 /> */}
     
    {/* { isNotLoginPage && isLogin && 
          <> 
            { window.localStorage.getItem('userName') }님 환영합니다.
            &nbsp;
            <button onClick={handlerLogout}>Logout</button>
          </> 
        }
    { isNotLoginPage && !isLogin && 
          <>
            <button onClick={handlerLogin}>Login</button>
          </>
        }    */}
=======
>>>>>>> b7ba2cdb6019baca0a57afcb019b3cd69641535f

      {/* <Header2 /> */}
      <Route path="/" component={LoginStart} exact={true} />

      {/* 메인*/}
      <Route path="/1" component={Main} exact={true} />

      {/* 공지사항 */}
      <Route path="/2" component={Notice} exact={true} />
<<<<<<< HEAD
      <Route path="/3" component={(props) => <Login {...props} setIsLogin={setIsLogin} />} exact={true} />
      <Route path="/4" component={ReportPage} exact={true} />
      <Route path="/5" component={SignUp} exact={true} />
      <Route path="/6" component={TipList} exact={true} />
      <Route path="/7" component={ReportDetail} exact={true} />
      <Route path="/8" component={Notice} exact={true} />
      <Route path="/9" component={Notice} exact={true} />
      <Route path="/10" component={ProfileDetail} exact={true} /> 
      {/* 팁 */}
      <Route path="/11" component={TipList} exact={true} />
      {/* 잼 */}
      <Route path="/12" component={JamList} exact={true} />
      <Route path="/13" component={JamWrite} exact={true} />
      {/* 파트너 구인 */}
      <Route path="/14" component={PartnerWrite} exact={true}/>
      <Route path="/15" component={Chatting} exact={true}/>
      <Route path="/16" component={Payment} exact={true}/>
      <Route path="/17" component={Doing} exact={true}/>
      <Route path="/17/:pcIdx" component={ContentUpdate} exact={true} />
      <Route path="/18" component={Charge} exact={true}/>

      {/* 비었음 사용할 것 */}
      <Route path="/19" component={JamDetail} exact={true} />
      <Route path="/20" component={Notice} exact={true} />
=======
      <Route path="/notice/write" component={NoticeWrite} exact={true} />
      <Route path="/notice/detail/:noticeIdx" component={NoticeDetail} exact={true} />

      {/* 로그인 */}
      <Route path="/3" component={(props) => <Login {...props} setIsLogin={setIsLogin} />} exact={true} />

      {/* 회원 가입 */}
      <Route path="/4" component={SignUp} exact={true} />

      {/* 신고 */}
      <Route path="/5" component={ReportPage} exact={true} />
            {/* 리포트 리스트 페이지 없음 */}
      <Route path="/6" component={ReportList} exact={true} />

      <Route path="/7/:reportIdx" component={ReportDetail} exact={true} /> 
      {/* <Route path="/7" component={ReportDetail} exact={true} /> */}


      {/* 잼 */}
      <Route path="/8" component={JamList} exact={true} />
      <Route path="/9" component={JamWrite} exact={true} />
      <Route path="/10" component={JamDetail2} exact={true} />
      <Route path="/11/:cIdx" component={JamDetail} exact={true} />

      {/* 팁게시판 */}
      <Route path="/13" component={TipList} exact={true} />
      <Route path="/14/:tbIdx" component={TipEdit} excat = {true}/>
      <Route path="/15/:tbIdx" component={TipDetail} exact={true} />
      <Route path="/16" component={TipWrite} exact={true} />

      {/* 음원 분리 */}
      <Route path="/17" component={MusicSplit} exact={true} />

      {/* 채팅 */}
      <Route path="/18" component={Chatting} exact={true}/>

      {/* 프로필 */}
      <Route path="/19" component={ProfileDetail} exact={true} />
      <Route path="/20" component={ProfileWrite} exact={true} />
     
      {/* 파트너 구인 */}
      <Route path="/21" component={PartnerWrite} exact={true}/>
      <Route path="/23" component={Payment} exact={true}/>
      <Route path="/24" component={Doing} exact={true}/>
      <Route path="/25" component={Charge} exact={true}/>
      {/*  */}
>>>>>>> b7ba2cdb6019baca0a57afcb019b3cd69641535f
      <Footer />
    </>
  )
}
export default App;