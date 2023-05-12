import style from './MainAd.module.css';
import React from 'react';
import warning from './warning.png';
import arrow from './right-arrow.png';
import megaphone from './megaphone.png';
import coin from './coin.png';
import checkbox from './checkbox.png';


const MainAd = () => {
    return (
        <>
            <div className={style.mainBox}>
                <h1 className={style.mainText}> 관리자 전용 페이지 </h1>
                <div className={style.report}>
                    <img src={warning} className={style.reportIcon}></img> <p>신고 관리 </p>
                    <img src={arrow} className={style.reportArrow}></img> </div>

                <div className={style.notify}>
                    <img src={megaphone} className={style.notifyIcon}></img><p>공지 등록</p>
                    <img src={arrow} className={style.notifyArrow}></img></div>

                <div className={style.deal}>
                    <img src={coin} className={style.dealIcon}></img> <p>거래 내역</p>
                    <img src={arrow} className={style.dealArrow}></img></div>

                {/* 인증 빼면 이 공간은 무엇으로 사용..? */}
                <div className={style.certification}><img src={checkbox} className={style.certificationIcon}></img> <p>인증 관리 </p>
                    <img src={arrow} className={style.certificationArrow}></img></div>
            </div>
        </>
    );
}

export default MainAd;