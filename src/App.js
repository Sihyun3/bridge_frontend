import logo from './logo.svg';
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
import TipDetail from './Tip/TipDetail';
import DealListAd from './Administrator/DealListAd';



function App() {
  return (
    <>

    <DealListAd />
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
    </>
  )
}
export default App;
