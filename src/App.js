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
import JamDetail2 from './Jam/JamDetail2';
import MusicSplit from './MusicSplit/MusicSplit';
import ReportList from './Admin-Report/ReportList';
import TipEdit from './Tip/TipEdit'
import TipDetail from './Tip/TipDetail'
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import PartnerList from './Partner/PartnerList';
import PartnerDatail from './Partner/PartnerDatail';
import Header4 from './Header/Header4';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  //  useEffect(()=>{
  //   sessionStorage.setItem("token",	"eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInN1YiI6InRlc3QiLCJqdGkiOiJkMjE3ZmQ0Ny1kYWUwLTQ0OGEtOTQwNy1mYWE1NjY2OTQ3NWIiLCJpYXQiOjE2ODI1ODY1MjgsImV4cCI6ODY0MDE2ODI1ODY1Mjh9.nEvZzgu8d0J4yfTaQ1Ea3oPUL-LQBH7aIv-JVxgF78o");
  //  },[])



  return (
    <>
    <Header4 isLogin={isLogin} setIsLogin={setIsLogin}/>
      {/* 완성된 페이지 */}

      <Route path="/notice" component={Notice} exact={true} />
      <Route path="/report/list" component={ReportList} exact={true} />

      {/* 완성중이나 디자인 수정 조금 필요함 */}
      <Route path="/report/detail/:reportIdx" component={ReportDetail} exact={true} />


      {/* 미 완성 페이지 */}
      {/* <Header2 /> */}
      <Route path="/1" component={LoginStart} exact={true} />

      {/* 메인*/}
      <Route path="/" component={Main} exact={true} />

      {/* 공지사항 */}
      <Route path="/notice/write" component={NoticeWrite} exact={true} />
      <Route path="/notice/detail/:noticeIdx" component={NoticeDetail} exact={true} />

      {/* 로그인 */}
      <Route path="/3" component={(props) => <Login {...props} setIsLogin={setIsLogin} />} exact={true} />

      {/* 회원 가입 */}
      <Route path="/4" component={SignUp} exact={true} />

      {/* 신고 */}
      <Route path="/report" component={ReportPage} exact={true} />





      {/* 잼 */}
      <Route path="/jam" component={JamList} exact={true} />
      <Route path="/jam/write" component={JamWrite} exact={true} />
      <Route path="/10" component={JamDetail2} exact={true} />
      <Route path="/jam/detail/:cIdx" component={JamDetail} exact={true} />

      {/* 팁게시판 */}
      <Route path="/tip" component={TipList} exact={true} />
      <Route path="/tip/edit/:tbIdx" component={TipEdit} excat={true} />
      <Route path="/tip/detail/:tbIdx" component={TipDetail} exact={true} />
      <Route path="/tip/write" component={TipWrite} exact={true} />

      {/* 음원 분리 */}
      <Route path="/17" component={MusicSplit} exact={true} />

      {/* 채팅 */}
      <Route path="/chatting" component={Chatting} exact={true} />

      {/* 프로필 */}
      <Route path="/19" component={ProfileDetail} exact={true} />
      <Route path="/20" component={ProfileWrite} exact={true} />

      {/* 파트너 구인 */}
      <Route path="/21" component={PartnerWrite} exact={true}/>
      <Route path="/23" component={Payment} exact={true}/>
      <Route path="/24" component={Doing} exact={true}/>
      <Route path="/25" component={Charge} exact={true}/>
      <Route path="/26" component={PartnerList} exact={true}/>
      <Route path="/partner/detail/:crIdx" component={PartnerDatail} exact={true}/>
      
      {/* 거래내역 */}
      <Route path="/27" component={DealListAd} exact={true} />
      {/* 어드민 메인 페이지 */}
      <Route path="/28" component={MainAd} exact={true} />
      <Footer />
    </>
  )
}
export default App;