import style from './MainAd.module.css';
import React from 'react';
import warning from '../img/warning.png';
import arrow from '../img/right-arrow.png';
import megaphone from '../img/megaphone.png';
import coin from '../img/coin.png';
import checkbox from '../img/checkbox.png';


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

                <div className={style.certification}><img src={checkbox} className={style.certificationIcon}></img> <p>인증 관리 </p>
                    <img src={arrow} className={style.certificationArrow}></img></div>
            </div>
        </>
    );
}

export default MainAd;