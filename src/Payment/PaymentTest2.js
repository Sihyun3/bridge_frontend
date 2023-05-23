import style from './Payment.module.css';
import user from './user.png';
import arrow from './PaymentImg.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

function PaymentTest2({ match }) {
    const history = useHistory();

    const { producer, cidx } = match.params;
    const [user1, setUser1] = useState([]);
    const [clients, setClients] = useState('');
    const [downpayment, setDownpayment] = useState('');
    const [usepoint, setUsepoint] = useState('');
    let [pointBox, setPointBox] = useState('');
    const [total, setTotal] = useState('');
    const [isChecked, setIsChecked] = useState(false);



    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            alert(`로그인이 필요합니다. 로그인해주세요`);
            history.push('/login')
            return;
        }
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUser1(decode_token.sub);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/payment/detail/${decode_token.sub}`)
            .then(response => {
                setUsepoint(response.data);
                setClients(decode_token.sub);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handlerOnClickToPay = (e) => {
        if (total == 0 && usepoint >= total) {
            axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/doPayment/${producer}`,
                { "clients": user1, "producer": producer, "usepoint": pointBox, "totalCost": total, downpayment })
                .then(response => {
                    alert('결제가 완료되었습니다.');
                    history.push(`/partner/doing/detail/${cidx}`);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (total > 0 && usepoint > total && pointBox < total) {
            setTemp(usepoint);
            alert('입력하신 금액보다 총 결제금액이 많습니다 \n확인 후 다시 시도하세요.');
            setPointBox(0);
            setUsepoint(temp);
            setTotal(downpayment);
        } else {
            alert('보유 포인트가 부족합니다. 포인트를 충전해주세요.');
            history.push(`/partner/charge/${total}`);
        }
    }


    const [temp, setTemp] = useState('');

    const handlerusepoint = (e) => {
        setTemp(Number(usepoint) - Number(pointBox));
        setTotal(Number(total) - Number(pointBox))
    }

    const handleCheckBoxChange = (e) => {
        if (!isChecked && usepoint >= downpayment) {
            setPointBox(downpayment);
            setTemp(usepoint - downpayment);
            setIsChecked(true);
            setTotal(0);
        } else if (!isChecked && usepoint < downpayment) {
            setPointBox(usepoint);
            setTemp(0);
            setTotal(downpayment - usepoint);
            setIsChecked(true);
        } else if (isChecked) {
            setTotal(downpayment);
            setTemp('');
            setPointBox(0);
            setIsChecked(false)
        }
    }

    return (
        <>
            <div className='container clearfix' >
                <div className={style.mainBox}>
                    <div className={style.mainText}>결제</div>
                    <div className={style.profile}>
                        <div className={style.request}>
                            <div className={style.requestText}>{clients}</div>
                            <img src={user} className={style.requestImg}></img>
                        </div>

                        <img src={arrow} className={style.arrowImg}></img>

                        <div className={style.response}>
                            <div className={style.responseText}>{producer}</div>
                            <img src={user} className={style.responseImg}></img>
                        </div>
                    </div>

                    <div>
                        <span className={style.willPayment}>의뢰 완료시 결제될 금액</span>
                        <input type="number" value={downpayment} name="downpayment" className={style.willPaymentAm} placeholder='ex)  100,000'
                            onChange={e => {
                                setDownpayment(e.target.value)
                                setTotal(e.target.value)
                            }} />
                    </div>
                    <div className={style.hr}>
                        <hr width="500px" color='black' size="1.5" />
                    </div>
                    <div className={style.total}> 총 결제 금액
                        <span className={style.totalPayment} name="total"> {total} 원</span>
                    </div>

                    <div>
                        <div className={style.point}>Bridge 포인트</div>
                        <div>
                            <input type="number" name="pointBox" value={pointBox} className={style.pointInput} onChange={(e) => {
                                setPointBox(e.target.value)
                            }} onBlur={handlerusepoint} />
                        </div>
                        <div className={style.havePoint}>
                            {
                                temp === '' ? <span className={style.have}>보유 {usepoint} P</span>
                                    :
                                    <span className={style.have}>보유 {temp} P</span>
                            }
                            <label for='All' className={style.selectText}>모두 사용</label>
                            <input type='checkbox' className={style.selectAll} id='All' name='All' value="All" onClick={handleCheckBoxChange} />
                        </div>

                        <button className={style.paymentBtn} onClick={handlerOnClickToPay}>결제</button>

                        {pointBox < total || usepoint < total == <p className={style.paymentNotice} >잔액이 부족합니다. 포인트를 충전해주세요.</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentTest2;