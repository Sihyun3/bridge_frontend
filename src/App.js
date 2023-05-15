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
import NoticeWrite from './Admin-Notice/NoticeWrite';
import NoticeDetail from './Admin-Notice/NoticeDetail';
import TipWrite from './Tip/TipWrite'
import JamDetail from './Jam/JamDetail';
// import JamDetail2 from './Jam/JamDetail2';
import MusicSplit from './MusicSplit/MusicSplit';
import ReportList from './Admin-Report/ReportList';
import TipEdit from './Tip/TipEdit'
import TipDetail from './Tip/TipDetail'
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import PartnerList from './Partner/PartnerList';
import PartnerDatail from './Partner/PartnerDatail';
import Header4 from './Header/Header4';
import LoginTest from './Login/LoginTest';
import SignUpTest from './SignUp/SignUpTest';
import PaymentTest from './Payment/PaymentTest';
import PaymentTest2 from './Payment/PaymentTest2';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInN1YiI6InRlc3QiLCJqdGkiOiJkMjE3ZmQ0Ny1kYWUwLTQ0OGEtOTQwNy1mYWE1NjY2OTQ3NWIiLCJpYXQiOjE2ODI1ODY1MjgsImV4cCI6ODY0MDE2ODI1ODY1Mjh9.nEvZzgu8d0J4yfTaQ1Ea3oPUL-LQBH7aIv-JVxgF78o");
  // }, [])



  return (
    <>
      <Header4 isLogin={isLogin} setIsLogin={setIsLogin} />
      {/* 완성된 페이지 */}

   
      <Route path="/report/list" component={ReportList} exact={true} />
      <Route path="/tip" component={TipList} exact={true} />
      <Route path="/tip/write" component={TipWrite} exact={true} />
      <Route path="/notice/write" component={NoticeWrite} exact={true} />
      <Route path="/jam" component={JamList} exact={true} />
      <Route path="/bridge/admin/notice/list" component={Notice} exact={true} />
      <Route path="/bridge/admin/report/list" component={ReportList} exact={true} />
      <Route path="/bridge/admin/notice/write" component={NoticeWrite} exact={true} />
      <Route path="/bridge/notice/detail/:noticeIdx" component={NoticeDetail} exact={true} />

      {/* 완성중이나 디자인 수정 조금 필요함 */}
      <Route path="/bridge/admin/report/detail/:reportIdx" component={ReportDetail} exact={true} />
      <Route path="/bridge/report/write" component={ReportPage} exact={true} />

      {/* 미 완성 페이지 */}
      {/* <Header2 /> */}
      <Route path="/bridge/login/start" component={LoginStart} exact={true} />

      {/* 메인*/}
      <Route path="/" component={Main} exact={true} />

      {/* 공지사항 */}
     
      {/* 로그인 */}
      <Route path="/login" component={(props) => <LoginTest {...props} setIsLogin={setIsLogin} />} exact={true} />
      {/* 로그인 테스트  */}
      {/* 왓 이즈 디스..? */}
      {/* <Route path="/29" component={LoginTest} exact={true} /> */}


      {/* 회원 가입 */}
      <Route path="/signup" component={SignUp} exact={true} />
      {/* 왓 이즈 디스...? */}
      <Route path="/30" component={SignUpTest} exact={true} />

      {/* 잼 */}
      <Route path="/bridge/jam/list" component={JamList} exact={true} />
      <Route path="/bridge/jam/write" component={JamWrite} exact={true} />
      <Route path="/bridge/jam/detail/:cIdx" component={JamDetail} exact={true} />

      {/* 팁게시판 */}
      <Route path="/bridge/tip/list" component={TipList} exact={true} />
      <Route path="/bridge/tip/edit/:tbIdx" component={TipEdit} excat={true} />
      <Route path="/bridge/tip/detail/:tbIdx" component={TipDetail} exact={true} />
      <Route path="/bridge/tip/write" component={TipWrite} exact={true} />

      {/* 음원 분리 */}
      <Route path="/split" component={MusicSplit} exact={true} />

      {/* 채팅 */}
      {/* 엔터 눌러도 채팅 전송되게 수정해주세요 */}
      <Route path="/bridge/chatting" component={Chatting} exact={true} />

      {/* 프로필 */}
      <Route path="/bridge/profile/detail" component={ProfileDetail} exact={true} />
      <Route path="/bridge/profile/write" component={ProfileWrite} exact={true} />

      {/* 파트너 구인 */}
      <Route path="/bridge/partner/write" component={PartnerWrite} exact={true} />
      <Route path="/bridge/partner/payment" component={Payment} exact={true} />
      <Route path="/bridge/partner/doing" component={Doing} exact={true} />
      <Route path="/bridge/partner/charge/:total" component={Charge} exact={true} />
      <Route path="/bridge/partner/list" component={PartnerList} exact={true} />
      <Route path="/bridge/partner/detail/:crIdx" component={PartnerDatail} exact={true} />

      {/* 거래내역 */}
      <Route path="/bridge/admin/deal/list" component={DealListAd} exact={true} />
      {/* 어드민 메인 페이지 */}
      <Route path="/bridge/admin" component={MainAd} exact={true} />

      {/* 왓 이즈 디스....? */}
      {/* <Route path="/bridge/payment" component={PaymentTest} exact={true} /> */}

      {/* <Route path="/bridge/jam/detail" component={JamDetail2} exact={true} /> */}

      {/* 테스트 페이지 */}
      <Route path="/bridge/payment" component={PaymentTest2} exact={true}/>
      <Footer />
    </>
  )
}
export default App;