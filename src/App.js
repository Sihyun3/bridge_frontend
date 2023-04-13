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
<<<<<<< HEAD
import TipDetail from './Tip/TipDetail';
import DealListAd from './Administrator/DealListAd';
import PartnerWrite from './Partner/PartnerWrite';


=======
import Footer from './Footer/Footer';
import { Route } from 'react-router-dom';
// import { Routes } from 'react-router-dom';
>>>>>>> fbaffe88ac03d0591c1e4924f7a56bd41f9327ec

function App() {
  return (
    <>
<<<<<<< HEAD
    <PartnerWrite/>
    {/* <DealListAd /> */}
      {/* <MainAd /> */}

      {/* <Main />
      <Login />

      <Layout />

      <Main />
      <Login />
      <ReportPage />
      <SignUp />
      <TipList />
      <Login />
      <SignUp />
      <TipList />
      <Notice /> */}
=======
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
      <Footer/>
>>>>>>> fbaffe88ac03d0591c1e4924f7a56bd41f9327ec
    </>
  )
}
export default App;
