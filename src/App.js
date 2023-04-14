import logo from './logo.svg';
import Header from './Header/Header';
import Layout from './Layout/Layout';
import './App.css';
import Main from './Main/Main';
import Login from './Login/Login'
import MainAd from './Administrator/MainAd';
import ReportPage from './Report/ReportPage';
import SignUp from './SignUp/SignUp';
import TipList from './TipList/TipList';
import Notice from './Admin-Notice/Notice';
import ReportDetail from './Admin-Report/ReportDetail';



function App() {
  return (
    <>

      {/* <Main/>
    <Login/> */}
      <MainAd />
      <Layout />
      <Main />
      <Login />
      <ReportPage />
      <ReportDetail />
      {/* <SignUp/> */}
      {/* <TipList/> */}
      {/* <Login/> */}
      {/* <SignUp/> */}
      {/* <TipList/> */}
      <Notice />
    </>
  )
}
export default App;
