import Header from './Header/Header';
import Layout from './Layout/Layout';
import './App.css';
import Main from './Main/Main';
import Login from './Login/Login'
import MainAd from './Administrator/MainAd';
import ReportPage from './Report/ReportPage';
import SignUp from './SignUp/SignUp';
import TipList from './Tip/TipList';
import Notice from './Admin-Notice/Notice';
import Footer from './Footer/Footer';
import { Route } from 'react-router-dom';
import TipDetail from './Tip/TipDetail';
import Partner from './Partner/PartnerList';
import PartnerDatail from './Partner/PartnerDatail';
import ProfileWrite from './Profile/ProfileWrite';

// import { Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header/>
      {/* <Route path="/" component={Main} exact={true} />
      <Route path="/1" component={Notice} exact={true} />
      <Route path="/2" component={Login} exact={true} />
      <Route path="/3" component={ReportPage} exact={true} />
      <Route path="/4" component={SignUp} exact={true} />
      <Route path="/5" component={TipList} exact={true} />
      <Route path="/6" component={Notice} exact={true} />
      <Route path="/7" component={Notice} exact={true} />
      <Route path="/8" component={Notice} exact={true} />
      <Route path="/9" component={Notice} exact={true} />
      <Route path="/10" component={Notice} exact={true} />
      <Route path="/11" component={Notice} exact={true} /> */}
     <ProfileWrite/>
      
      <Footer/>
    </>
  )
}
export default App;
