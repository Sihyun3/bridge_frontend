// 헤더 풋터
import Header2 from './Header/Header2';
import Footer from './Footer/Footer';

//페이지 임포트
import LoginStart from './Login/LoginStart';
import Main from './Main/Main';
import Notice from './Admin-Notice/Notice';
// import Login from './Login/Login';
import ReportPage from './Report/ReportPage';
import SignUp from './SignUp/SignUp';
import TipList from './Tip/TipList';
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
import NoticeWrite from './Admin-Notice/NoticeWrite';
import NoticeDetail from './Admin-Notice/NoticeDetail';


import { Route } from 'react-router-dom';
// import KakaoLogin from './Login/KaKaoLogin';


import TipWrite from './Tip/TipWrite'
import JamDetail from './Jam/JamDetail';
import JamDetail2 from './Jam/JamDetail2';
import MusicSplit from './MusicSplit/MusicSplit';
import { useEffect } from 'react';
import NoticeDetail from './Admin-Notice/NoticeDetail';
import ReportList from './Admin-Report/ReportList';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // 로그인 페이지로 이동
  // const handlerLogin = (e) => {
  //   e.preventDefault();
  //   window.location.href = '/3';
  // };

  //   // 로그아웃 처리 
  // // 로그아웃 처리 
  // // 로컬 스토리지 내용 삭제 후 홈(/)으로 이동
  // const handlerLogout = (e) => {
  //   e.preventDefault();
  //   localStorage.clear();
  //   window.location.href = '/';
  // };

  //   // 로그인 페이지가 아닌 경우 로그인/로그아웃 버튼을 제공
  // // 로그인 페이지가 아닌 경우 로그인/로그아웃 버튼을 제공
  // // 로그인 상태인 경우 로그인 정보와 로그아웃 버튼을 
  // // 로그아웃 상태인 경우 로그인 버튼을 제공
  // const isNotLoginPage = window.location.pathname === '/3' ? false : true;
  // // const isLogin = !!window.localStorage.getItem('userName');


     useEffect(()=>{
      sessionStorage.setItem("token",	"eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInN1YiI6InRlc3QiLCJqdGkiOiJiYzE0NzhlZC05ZjE5LTRkMGUtOGEyMi05ZmRmYmI3NjVlODgiLCJpYXQiOjE2ODI1NjAzOTAsImV4cCI6MTY4MjY0Njc5MH0.dkSCzKTF-wXRfyvtYit_MScEPgDJPFDOehHY1I8Tdt8");
     },[])
     
  return (
    <>
      {/* <Header2 /> */}
      {/* <Route path="/" component={LoginStart} exact={true} /> */}
     
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

      {/* <Header2 /> */}
      <Route path="/" component={LoginStart} exact={true} />

      {/* 메인, 공지 */}
      {/* <Route path="/1" component={Main} exact={true} /> */}
      <Route path="/2" component={Notice} exact={true} />
      
      {/* 로그인, 회원가입 */}
      {/* <Route path="/3" component={Login} exact={true} /> */}
      {/* <Route path="/4" component={SignUp} exact={true} /> */}
      {/* 관리자 */}
      {/* <Route path="/5" component={ReportPage} exact={true} />
      <Route path="/6" component={ReportDetail} exact={true} /> */}
      {/* <Route path="/7" component={DealListAd} exact={true}/> */}
      {/* <Route path="/8" component={MainAd} exact={true}/> */}
      {/* 프로필 */}
      {/* <Route path="/9" component={ProfileWrite} exact={true}/> */}
      {/* <Route path="/10" component={ProfileDetail} exact={true} /> */}
      {/* <Route path="/3" component={(props) => <Login {...props} setIsLogin={setIsLogin} />} exact={true} /> */}
   
      <Route path="/5" component={SignUp} exact={true} />
      <Route path="/6" component={TipList} exact={true} />
     
      <Route path="/8" component={Notice} exact={true} />
      {/* <Route path="/9" component={NoticeDetail} exact={true} /> */}
      <Route path='/api/announcementDetail/:aIdx' component={NoticeDetail} exact={true}/>
      
      {/* 팁 */}
      {/* <Route path="/11" component={TipList} exact={true} /> */}
      {/* 잼 */}
      {/* <Route path="/12" component={JamList} exact={true} /> */}
      {/* <Route path="/13" component={JamWrite} exact={true} /> */}
      {/* 파트너 구인 */}
      {/* <Route path="/14" component={PartnerWrite} exact={true}/> */}
      {/* <Route path="/15" component={Chatting} exact={true}/> */}
      {/* <Route path="/16" component={Payment} exact={true}/> */}
      {/* <Route path="/17" component={Doing} exact={true}/> */}
      {/* <Route path="/18" component={Charge} exact={true}/> */}

      {/* 비었음 사용할 것 */}
      <Route path="/notice/write" component={NoticeWrite} exact={true} />
      <Route path="/notice" component={Notice} exact={true} />
      <Route path="/notice/detail/:noticeIdx" component={NoticeDetail} exact={true} />

      {/* <Footer /> */}
      <Route path="/12" component={JamList} exact={true} />
      <Route path="/13" component={JamWrite} exact={true} />
      <Route path="/14" component={JamDetail2} exact={true} />
      {/* 잼 => 이클립스 백엔드 실행 & /14 실행 */}

      {/* 파트너 구인 */}
      <Route path="/15" component={PartnerWrite} exact={true}/>
      <Route path="/16" component={Chatting} exact={true}/>
      <Route path="/17" component={Payment} exact={true}/>
      <Route path="/18" component={Doing} exact={true}/>
      <Route path="/19" component={Charge} exact={true}/>

      {/* 비었음 사용할 것 */}
      <Route path="/23" component={JamDetail} exact={true} />
      
      
      {/* 신고 */}
      <Route path="/4" component={ReportPage} exact={true} />
      <Route path="/21" component={ReportList} exact={true} />
      <Route path="/7/:reportIdx" component={ReportDetail} exact={true} />

      {/* 음원 분리 */}
      <Route path="/22" component={MusicSplit} exact={true} />

      {/* 프로필 */}
      <Route path="/10" component={ProfileDetail} exact={true} />
      <Route path="/20" component={ProfileWrite} exact={true} />

      
      <Footer />
    </>
  )
}
export default App;
