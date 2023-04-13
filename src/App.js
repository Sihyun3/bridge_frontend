// import Header from './Header/Header';
// import Layout from './Layout/Layout';
import './App.css';
import Main from './Main/Main';
import Login from './Login/Login'
// import MainAd from './Administrator/MainAd';
import ReportPage from './Report/ReportPage';
import SignUp from './SignUp/SignUp';
import TipList from './Tip/TipList';
import Notice from './Admin-Notice/Notice';
import Footer from './Footer/Footer';
import { Route } from 'react-router-dom';
import DealListAd from './Administrator/DealListAd';
import PartnerWrite from './Partner/PartnerWrite';
import Charge from './Charge/Charge';
import Payment from './Payment/Payment';
import TipDetail from './Tip/TipDetail';
import Partner from './Partner/PartnerList';
import PartnerDatail from './Partner/PartnerDatail';
import ProfileWrite from './Profile/ProfileWrite';

// import { Routes } from 'react-router-dom';
// import Header2 from './Header/Header2';

function App() {
  return (
    <>
      <Header2/>
      <Route path="/" component={LoginStart} exact={true}/>
      <Route path="/1" component={Main} exact={true} />
      <Route path="/2" component={Notice} exact={true} />
      <Route path="/3" component={Login} exact={true} />
      <Route path="/4" component={ReportPage} exact={true} />
      <Route path="/5" component={SignUp} exact={true} />
      <Route path="/6" component={TipList} exact={true} />
      <Route path="/7" component={Notice} exact={true} />
      <Route path="/8" component={Notice} exact={true} />
      <Route path="/9" component={Notice} exact={true} />
      <Route path="/10" component={ProfileDetail} exact={true} />
      <Route path="/11" component={JamList} exact={true} />
      <Route path="/12" component={Doing} exact={true}/>
      <Route path="/12" component={Doing} exact={true}/>
      <Route path="/12" component={Doing} exact={true}/>s
     <ProfileWrite/>
      
      <Footer/>
      </>
  )
}
export default App;
