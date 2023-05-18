// 헤더 풋터

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

import BackToTop from './BackToTop';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header4 isLogin={isLogin} setIsLogin={setIsLogin} />
      {/* 페이지가 완성된 페이지 */}

      <Route path="/bridge/admin/notice/list" component={Notice} exact={true} />
      <Route path="/bridge/admin/report/list" component={ReportList} exact={true} />
      <Route path="/bridge/admin/notice/write" component={NoticeWrite} exact={true} />
      <Route path="/bridge/notice/detail/:noticeIdx" component={NoticeDetail} exact={true} />
      <Route path="/bridge/admin" component={MainAd} exact={true} />
      <Route path="/bridge/partner/list" component={PartnerList} exact={true} />
      <Route path="/bridge/tip/list" component={TipList} exact={true} />
      <Route path="/bridge/tip/write" component={TipWrite} exact={true} />
      <Route path="/bridge/partner/detail/:crIdx" component={PartnerDatail} exact={true} />
      <Route path="/bridge/jam/list" component={JamList} exact={true} />
      <Route path="/bridge/jam/write" component={JamWrite} exact={true} />
      <Route path="/bridge/admin/deal/list" component={DealListAd} exact={true} />

      {/* 완성중이나 디자인 수정 조금 필요함 */}
      <Route path="/bridge/admin/report/detail/:reportIdx" component={ReportDetail} exact={true} />
      <Route path="/bridge/report/write" component={ReportPage} exact={true} />

      {/* 미 완성 페이지 */}
      <Route path="/bridge/login/start" component={LoginStart} exact={true} />

      {/* 메인*/}
      <Route path="/" component={Main} exact={true} />

      {/* 공지사항 */}
     
      {/* 로그인 */}
      <Route path="/bridge/login" component={(props) => <LoginTest {...props} setIsLogin={setIsLogin} />} exact={true} />

      <Route path="/jam/list" component={JamList} exact={true} />
      <Route path="/jam/write" component={JamWrite} exact={true} />

      <Route path="/admin" component={MainAd} exact={true} />
      <Route path="/admin/notice/list" component={Notice} exact={true} />
      <Route path="/admin/notice/write" component={NoticeWrite} exact={true} />     {/* 수정 기능 안됨 */}
      <Route path="/admin/deal/list" component={DealListAd} exact={true} />
      <Route path="/admin/report/detail/:reportIdx" component={ReportDetail} exact={true} /> {/* 영구정지 권한 제어 필요 */}

      <Route path="/notice/detail/:noticeIdx" component={NoticeDetail} exact={true} />

      <Route path="/partner/detail/:crIdx" component={PartnerDatail} exact={true} />  {/* 신청하기 누르면 채팅방 뜨게 */}
      <Route path="/partner/charge" component={Charge} exact={true} />

      <Route path="/tip/list" component={TipList} exact={true} />         {/* 리스트가 너무 여러개 뜸 */}
      <Route path="/tip/write" component={TipWrite} exact={true} />
      <Route path="/tip/detail/:tbIdx" component={TipDetail} exact={true} /> {/* 덧글 verchar(100)넘을시 덧글 길다는 안내창 있어야함, 수정 버튼 클릭시 동일 id임에도 작성자만 삭제(?) 가능하다고 뜸 */}

      <Route path="/split" component={MusicSplit} exact={true} />

      <Route path="/profile/write" component={ProfileWrite} exact={true} /> {/*악기 선택을 악기 태그와 통일할 필요 있음*/}
      <Route path="/report/write" component={ReportPage} exact={true} />


      {/* 기능 완성 */}
      <Route path="/find/:idx" component={Finduser} exact={true}/>

      <Route path="/admin/report/list" component={ReportList} exact={true} /> {/* 디자인 깨짐 */}  

      <Route path="/partner/list" component={PartnerList} exact={true} /> 
      <Route path="/partner/write" component={PartnerWrite} exact={true} />
      <Route path="/partner/payment" component={PaymentTest2} exact={true} />

      <Route path="/chatting" component={Chatting} exact={true} /> {/*미리보기 기능과 공백일시 전송안되게 해야함*/}

      <Route path="/deal/list" component={PaymentList} exact={true} />

      {/* 디자인 * 기능 미완 */}
      <Route path="/jam/detail/:cIdx" component={JamDetail} exact={true} />

      <Route path="/tip/edit/:tbIdx" component={TipEdit} excat={true} /> {/* 수정 안됨 */}
      
      <Route path="/profile/detail/:userId" component={ProfileDetail} exact={true} />
      
      <Route path="/partner/doing" component={Doing} exact={true} />

      <Footer />
       {/* 위로 가는 버튼 */}
       <BackToTop/>
    </>
  )
}
export default App;