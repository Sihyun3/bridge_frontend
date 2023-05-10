import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Password } from '@mui/icons-material';
import style from './Finduser.module.css'

export default function Finduser({ match }) {

    const idx = match.params.idx;

    const [data, setData] = useState('');
    const [auth, setAuth] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [temp, setTemp] = useState('');

    const handlerAuth = () => {
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/emailConfirm/${email}`)
            .then((r) => {
                console.log(r.data)
                setAuth(r.data)
                alert("인증번호가 발송되었습니다.")
            })
            .catch(() => {
                alert("오류가 발생하였습니다.")
            })
    }

    const handlerCheck = () => {
        if (auth == temp) {
            axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/findid/${email}`)
                .then((r) => {
                    setData("아이디는 " + r.data + "입니다.");
                })
                .catch(() => {
                    alert("일치하는 정보가 없습니다.")
                })
        } else {
            setData("인증번호가 일치하지 않습니다.")
        }
    }
    const handlerCheck1 = () => {
        if (auth == temp) {
            setData(true);
        } else {
            setData("인증번호가 일치하지 않습니다.")
        }
    }
    const handlerChange = () => {
        if (auth == temp) {
            axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/findPassword/${email}/${password}`)
                .then((r) => {
                    alert('비밀번호가 변경 되었습니다.')
                })
                .catch(() => {
                    alert("일치하는 정보가 없습니다.")
                })
        } else {
            setData("인증번호가 일치하지 않습니다.")
        }
    }

    if (idx == 0) {
        return (

            <div className="clearfix container" style={{ height: "100vh" }}>
                <div className={style.wrapper}>
                    <div className={style.container}>
                        <div className={style.form}>
                            <h1 className={style.h1}>아이디 찾기</h1>
                            <div>
                            <input className={style.input} placeholder='이메일을 입력하세요.' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                            <button className={style.button} onClick={handlerAuth}>인증</button>
                            </div>
                            <div>
                            <input className={style.input} placeholder='인증 코드를 입력해주세요' value={temp} onChange={(e) => { setTemp(e.target.value) }}></input>
                            <button className={style.button} onClick={handlerCheck}>확인</button>
                            </div>
                            <div>{data}</div>
                            {
                                auth != '' &&
                                <>

                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>

        );
    } else {
        return (
            <div className="clearfix container">
                <div>
                    <div>비밀번호 찾기</div>
                    <div>
                        <input placeholder='이메일을 입력하세요.' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <button onClick={handlerAuth}>인증</button>
                    </div>

                    <div>
                        <input placeholder='인증 코드를 입력해주세요' value={temp} onChange={(e) => { setTemp(e.target.value) }}></input>
                        <button onClick={handlerCheck1}>확인</button>
                    </div>
                    {data == true &&
                        <>
                            <div>비밀번호 변경</div>
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='비밀번호를 입력해주세요'></input>
                            <input value={checkPassword} onChange={(e) => { setCheckPassword(e.target.value) }} placeholder='비밀번호를 다시 입력해주세요'></input>
                            <button onClick={handlerChange}>확인</button>
                        </>
                    }
                </div>

            </div>

        )
    }

} 