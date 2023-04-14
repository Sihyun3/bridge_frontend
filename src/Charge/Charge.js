import style from './Charge.module.css';

const Charge = () => {

    return (
        <>
            <div className={style.mainBox}>
                <h1 className={style.mainText}>포인트 충전</h1>
                <div className={style.mainContent}>
                    <div className={style.possess}>
                        <p className={style.possessText}>현재 보유 포인트</p>
                        <p className={style.possessMoney}>10,000 원</p> 
                    </div>
                    <div className={style.charge}>
                        <p className={style.chargeText1}>충전할 금액</p>
                        <div className={style.chargeBox}>
                        <input type='text' className={style.chargeInput} placeholder='원하는 금액을 입력하세요.'></input>
                        <p className={style.chargeText2}>원</p>
                        </div>           
                    </div>
                    <hr className={style.hr}></hr>
                    <div className={style.result}>
                        <p className={style.resultText1}>충전 후 예상 포인트</p>
                        <p className={style.resultText2}>110,000 원</p>
                    </div>
                </div>
                <div className={style.regist}>
                    <button className={style.registButton}>충전하기</button>
                </div>
            </div>
        </>
    );
};

export default Charge;