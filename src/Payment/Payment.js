import style from './Payment.module.css';
import user from './user.png';

const Payment = () => {
    return (
        <>
            <div className={style.mainBox}>
                <div className={style.mainText}>결제 하기</div>
                <div className={style.profile}>
                    <div className={style.request}>
                        <div className={style.requestText}>신청자 닉넴</div>
                            <img src={user} className={style.requestImg}></img>
                    </div>
                    <div className={style.response}>
                        <div className={style.responseText}>커미션 주 닉넴</div>
                        <img src={user} className={style.responseImg}></img>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;