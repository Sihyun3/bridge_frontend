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
import Finduser from './Login/Finduser';
import SignUpTest from './SignUp/SignUpTest';
import PaymentTest from './Payment/PaymentTest';
import PaymentTest2 from './Payment/PaymentTest2';
import Portfolio from './Profile/Portfolio';
import PaymentList from './Payment/PaymentList';
import ProfileDetail from './Profile/ProfileDetail';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header4 isLogin={isLogin} setIsLogin={setIsLogin} />

      {/* 기능 & 디자인 완성된 페이지 */}
      <Route path="/" component={Main} exact={true} />
      <Route path="/login/start" component={LoginStart} exact={true} />
      <Route path="/login" component={(props) => <LoginTest {...props} setIsLogin={setIsLogin} />} exact={true} />
      <Route path="/signup" component={SignUpTest} exact={true} /> {/* 수정된 디자인으로 변경해주세요*/}

      <Route path="/jam/list" component={JamList} exact={true} />
      <Route path="/jam/write" component={JamWrite} exact={true} />

      <Route path="/admin" component={MainAd} exact={true} />
      <Route path="/admin/notice/list" component={Notice} exact={true} />
      <Route path="/admin/notice/write" component={NoticeWrite} exact={true} />
      <Route path="/admin/deal/list" component={DealListAd} exact={true} />
      <Route path="/admin/report/detail/:reportIdx" component={ReportDetail} exact={true} /> 

      <Route path="/notice/detail/:noticeIdx" component={NoticeDetail} exact={true} />

      <Route path="/partner/detail/:crIdx" component={PartnerDatail} exact={true} />
      <Route path="/partner/charge" component={Charge} exact={true} />

      <Route path="/tip/list" component={TipList} exact={true} />
      <Route path="/tip/write" component={TipWrite} exact={true} />
      <Route path="/tip/detail/:tbIdx" component={TipDetail} exact={true} /> {/* 디자인 디테일 수정 필요 */}

      <Route path="/split" component={MusicSplit} exact={true} />

      <Route path="/profile/write" component={ProfileWrite} exact={true} />
      <Route path="/report/write" component={ReportPage} exact={true} />
      <Route path="/bridge/signup" component={SignUpTest} exact={true} />
      <Route path="/signup" component={SignUp} exact={true} />

      {/* 기능 완성 */}
      <Route path="/find/:idx" component={Finduser} exact={true}/>

      <Route path="/admin/report/list" component={ReportList} exact={true} /> {/* 디자인 깨짐 */}  

      <Route path="/partner/list" component={PartnerList} exact={true} /> 
      <Route path="/partner/write" component={PartnerWrite} exact={true} />
      <Route path="/partner/payment" component={PaymentTest2} exact={true} />

      <Route path="/chatting" component={Chatting} exact={true} />

      <Route path="/deal/list" component={PaymentList} exact={true} />

      {/* 디자인 * 기능 미완 */}
      <Route path="/jam/detail/:cIdx" component={JamDetail} exact={true} />

      <Route path="/tip/edit/:tbIdx" component={TipEdit} excat={true} /> {/* 수정 안됨 */}
      
      <Route path="/profile/detail" component={ProfileDetail} exact={true} />
      
      <Route path="/partner/doing" component={Doing} exact={true} />

      <Footer />
    </>
  )
}
export default App;