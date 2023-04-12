import style from './MainAd.module.css';
import React from 'react';
import warning from '../img/warning.png';
import arrow from '../img/right-arrow.png';


const MainAd = () => {
    return (
        <>
            <div className={style.mainBox}>
                <h1 className={style.mainText}> 관리자 전용 페이지 </h1>
                <div className={style.report}><img className={style.reportIcon} src={warning}/><p>신고 관리</p> <img className={style.reportArrow} src={arrow}/></div>
                <div className={style.notify}>공지 등록</div>
                <div className={style.deal}><div className={style.reportIcon}></div> 거래 내역</div>
                <div className={style.certification}><div className={style.reportIcon}></div> 인증 관리</div>
            </div>
        </>
    );
}

export default MainAd;