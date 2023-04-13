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
import DealListAd from './Administrator/DealListAd';
import PartnerWrite from './Partner/PartnerWrite';
import Charge from './Charge/Charge';
import Payment from './Payment/Payment';

function App() {
  return (
    <>
      <Header/>
      <Route path="/" component={Main} exact={true} />
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
      <Route path="/11" component={Notice} exact={true} />
      <Route path="/12" component={MainAd} exact={true} />
      <Route path="/13" component={DealListAd} exact={true} />
      <Route path="/14" component={PartnerWrite} exact={true} />
      <Route path="/15" component={Charge} exact={true} />
      <Route path="/16" component={Payment} exact={true} />

      <Footer/>
    </>
  )
}
export default App;
