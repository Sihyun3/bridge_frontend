import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Waveform from '../Component/Waveform';
import { Link } from "react-router-dom";

const DoingDetail = ({ match }) => {
    const { cidx } = match.params;
    const history = useHistory();
    const [list, setList] = useState([]);
    const [inputText, setInputText] = useState('');
    const [userId, setUserId] = useState('');
    const [userId2, setUserId2] = useState('');
    const [music, setMusic] = useState([]);
    const [editIdx, setEditIdx] = useState(-1);
    const [editText, setEditText] = useState('');
    const [progress, setProgress] = useState(0);
    const [money, setMoney] = useState(0);
    const [willMoney, setWillMoney] = useState(0);


    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            alert('로그인이 필요합니다. 로그인해주세요');
            history.push('/login');
            return;
        }
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUserId(decode_token.sub);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getCommissionDetail/${cidx}`)
            .then(res => {
                console.log("************" + res.data);
                setList(res.data);
                axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getProgress/${cidx}`)
                    .then(r => {
                        console.log(">>>>" + r.data);
                        setProgress(r.data[0].progress);
                        setUserId2(r.data[0].userId2);
                        setMoney(r.data[0].cmoney);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(e => { console.log(e) });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let files = music;

        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        let datas = { "cdComment": inputText, userId, "cIdx": cidx };
        formData.append("data", new Blob([JSON.stringify(datas)], { type: "application/json" }));

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertCommissionDetail/${cidx}`, formData)
            .then((response) => {
                console.log("업로드 성공");
                axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getCommissionDetail/${cidx}`)
                    .then(res => {
                        console.log(">>>>" + res.data);
                        setList(res.data);
                        setInputText('');
                        setMusic([]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(() => {
                alert(`업로드 중 오류가 발생했습니다.`);
            });
    };

    const handleEditBtn = (cdIdx) => {
        setEditText(list.find(item => item.cdIdx === cdIdx).cdComment);
        setEditIdx(cdIdx);
    };

    const handleCancel = () => {
        setEditIdx(-1);
        // setInputText(editText);
        setInputText('');
        setMusic([]);
    };



    const handleSave = (cdIdx) => {
        let files = music;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        let data = {
            userId,
            cdComment: editText,
            cIdx: cidx,
        };
        formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
        formData.append("cidx", cidx);

        axios
            .put(
                `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/editCommissionDetail/${cidx}/${cdIdx}`,
                formData
            )
            .then((res) => {
                console.log("수정 성공");
                setEditIdx(-1);
                setMusic([]);
                axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getCommissionDetail/${cidx}`)
                    .then(res => {
                        setList(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const handleDel = (cdIdx) => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/delCommissionDetail/${cdIdx}`)
            .then(res => {
                console.log("삭제 성공");
                setEditIdx(-1);
                axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getCommissionDetail/${cidx}`)
                    .then(res => {
                        setList(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleFileDel = (cdIdx) => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/delCommissionFile/${cdIdx}`)
            .then(res => {
                console.log("파일 삭제 성공");
                setEditIdx(-1);
                axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getCommissionDetail/${cidx}`)
                    .then(res => {
                        setList(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEnd = () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/commissionEnd/${cidx}`)
            .then(r => {
                console.log("완료변경")
                window.location.reload();
            })
            .catch(e => { console.log(e) })
    }

    return (
        <>
            <div>
                <br />
                <div>
                    {progress == 0 ?
                        <p>현재 작업이 진행 중 입니다.</p>
                        :
                        <p>작업이 완료 되었습니다.</p>
                    }
                </div>
                <br />

                <div>
                    {progress == 0 && money > 0 ?
                        <p>{userId} 님이 {money}p 를 안심 결제하셨습니다 <br /> 작업 완료시 수령하실 수 있습니다 </p>
                        :
                        ""
                    }
                </div>

                <br />


                {list.map((item) => {
                    const { cdIdx, cDate, userId, cdComment, cdFile } = item;

                    return (
                        <div key={cdIdx}>
                            <p>{cDate}</p>
                            <div>
                                <span>{userId}</span>
                                <span> : </span>
                                {editIdx === cdIdx ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                        />
                                        <input type="file" multiple="multiple" onChange={(e) => setMusic(e.target.files)} />
                                        {music.length === 0 && cdFile && (
                                            <div>
                                                <span>기존 파일: {cdFile}</span>
                                                <br />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <span>{cdComment}</span>
                                )}
                            </div>

                            <button onClick={() => handleDel(cdIdx)}>삭제</button>  &nbsp;
                            {editIdx === cdIdx ? (
                                <>
                                    <button onClick={() => handleSave(cdIdx)}>저장</button>  &nbsp;
                                    <button onClick={handleCancel}>취소</button>
                                </>
                            ) : (
                                <button onClick={() => handleEditBtn(cdIdx)}>수정</button>
                            )}
                            <div>
                                {cdFile && (
                                    <div>
                                        <Waveform
                                            src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getMusic/${cdFile}`}
                                        />
                                        <button onClick={() => handleFileDel(cdIdx)}>파일 삭제</button>
                                    </div>
                                )}
                            </div>
                            <hr />
                        </div>
                    );
                })}
                {/* <div>
                    {progress == 1 ?
                        <p> {userId2} 님께 {willMoney}p 가 적립되었습니다.</p>
                        :
                        ""
                    }
                </div> */}
                <br />

                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
                <input type="file" multiple="multiple" onChange={(e) => setMusic(e.target.files)} />
                <button onClick={handleSubmit}>등록</button>
                <span> &nbsp;  &nbsp; &nbsp; </span>
                <Link to='/partner/doing'><button> 목록으로 </button></Link>
                <span> &nbsp;  &nbsp; &nbsp; </span>
                {money == 0 ? <Link to={`/partner/payment/${userId2}/${cidx}`}><button> 안심결제 </button></Link> : ""}
                <span> &nbsp;  &nbsp; &nbsp; </span>
                {progress == 0 ? <button onClick={handleEnd}> 작업완료 </button> : ""}
                <span> &nbsp;  &nbsp; &nbsp; </span>
            </div>
        </>
    );
};

export default DoingDetail;