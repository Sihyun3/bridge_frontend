import logo from './logo.svg';
import Header from './Header/Header';
import Layout from './Layout/Layout';

// import logo from './logo.svg';
import './App.css';
import Main from './Main/Main';
import Login from './Login/Login'

import SignUp from './SignUp/SignUp';
import TipList from './TipList/TipList';
import MainAd from './Administrator/MainAd';

// import SignUp from './SignUp/SignUp';
// import TipList from './TipList/TipList';
import ReportPage from './Report/ReportPage';
import SignUp from './SignUp/SignUp';
import TipList from './TipList/TipList';
import Notice from './Admin-Notice/Notice';



function App() {
  return (
    <>

    {/* <Main/>
    <Login/> */}
    <MainAd/>

      <Layout />


      <Main />
      <Login />
      <ReportPage/>
      {/* <SignUp/> */}
      {/* <TipList/> */}
    {/* <Login/> */}
    {/* <SignUp/> */}
    {/* <TipList/> */}
    <Notice/>
    </>
        )
  }
  export default App;
