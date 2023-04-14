import style from './ReportDetail.module.css';
// import Page from 'react';
// import '../reset.css';


function ReportDetail() {
  return (
    <>
      <div className={style.grayBox}>
        <h1 className={style.boxTitle}>사용자 신고 상세내역</h1>
        <div className={style.box}>
          <h5 className={style.boxText1}>신고 대상 :</h5>
          <div className={style.inputBox1}>이시현</div>
        </div>
        <div className={style.box}>
          <h5 className={style.boxText1}>신고자 :</h5>
          <div className={style.inputBox1} >조아라</div>
        </div>
        <div className={style.box2}>
          <h5 className={style.boxText2}>사유 :</h5>
          <div className={style.inputBox2}>인격모독</div>
        </div>
        <div className={style.box3}>
          <h5 className={style.boxText3}>상세내용 :</h5>
          <div className={style.inputBox3}>정말 어이없네요 영정 부탁드려요.</div>
        </div>
        <div className={style.box4}>
          <h5 className={style.boxText4}>제재하기 :</h5>
        </div>
        <div className={style.box5}>
          <input className={style.inputBox4} type="radio" name="date"/> 7일
          <input className={style.inputBox4} type="radio" name="date"/> 한 달
          <input className={style.inputBox4} type="radio" name="date"/> 영구정지
          <input className={style.inputBox4} type="radio" name="date"/> 제재 안 함
        </div>
        <button className={style.button1} onClick=''>처리하기</button>
      </div>
    </>
  );
}

export default ReportDetail;