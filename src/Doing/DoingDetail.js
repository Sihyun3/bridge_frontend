import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Waveform from '../Component/Waveform';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [open, setOpen] = useState(false);
    const [uuid, setUuid] = useState('');



    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            Swal.fire({
                icon: 'error',
                title: '로그인이 필요합니다.',
                text: '로그인 페이지로 이동합니다.',
            })
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
                        // console.log(">>>>" + r.data);
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
            if (!files[i].type.includes('audio')) {
                Swal.fire({
                    icon: 'info',
                    title: '음악 파일만 업로드 가능합니다',
                    text: '다시 시도해주세요.'
                })
                return;
            }
            formData.append("files", files[i]);
        }
        let datas = { "cdComment": inputText, userId, "cIdx": cidx };
        formData.append("data", new Blob([JSON.stringify(datas)], { type: "application/json" }));

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertCommissionDetail/${cidx}`, formData)
            .then((response) => {
                // console.log("업로드 성공>>>>>>" + response.data.uuid);
                setUuid(response.data.uuid);
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
                Swal.fire({
                    icon: 'error',
                    title: '업로드 중 오류가 발생했습니다.',
                    text: '다시 시도해주세요.'
                })
            });
    };

    const handleEditBtn = (cdIdx) => {
        setEditText(list.find(item => item.cdIdx === cdIdx).cdComment);
        setEditIdx(cdIdx);
    };

    const handleCancel = () => {
        setEditIdx(-1);
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

    const handleComment = (cdIdx) => {
        setOpen(false)
    }

    const submitComment = (cdIdx) => {
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insert/CommissionComment/${cdIdx}`, { userId, "ccContents": comment, cdIdx })
            .then(r => {
                console.log("댓글>>>>>>>>>>" + r.data);
                axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/get/CommissionComment/${cdIdx}`)
                    .then(r => {
                        setCommentList(r.data);
                        setOpen(true);
                    })
                    .catch(e => { console.log(e) })
            })
            .catch(e => { console.log("댓글실패" + e) })
    }

    const [commentIdx, setCommentIdx] = useState('');

    const handleOpen = (cdIdx) => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/get/CommissionComment/${cdIdx}`)
            .then(r => {
                setCommentList(r.data);
                setOpen(true);
                setCommentIdx(cdIdx);
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
                    const { cdIdx, cdDate, userId, cdComment, cdFile } = item;

                    return (
                        <div key={cdIdx}>
                            <div>
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
                                                    <span> {cdFile}</span>
                                                    <br />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div>
                                            <span>{cdComment}</span>
                                            <p>{cdDate}</p>
                                            {open && commentIdx == cdIdx && commentList.map((comment) => {
                                                const { ccIdx, userId, ccDate, ccContents, cdIdx } = comment;
                                                if (cdIdx === cdIdx) {
                                                    return (
                                                        <div key={cdIdx}>
                                                            <div>
                                                                <div>
                                                                    {ccDate} &nbsp;&nbsp; &nbsp;&nbsp;
                                                                    {userId}&nbsp;:&nbsp;&nbsp;
                                                                    {ccContents} &nbsp;&nbsp; &nbsp;&nbsp;
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    )}
                                </div>

                                <button onClick={() => handleDel(cdIdx)}>삭제</button>  &nbsp;
                                {editIdx === cdIdx ? (
                                    <>
                                        <button onClick={() => handleSave(cdIdx)}>저장</button>  &nbsp;
                                        <button onClick={handleCancel}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditBtn(cdIdx)}>수정</button> &nbsp;  &nbsp;
                                    </>
                                )}
                                <div>
                                    {open && commentIdx == cdIdx ?
                                        <button onClick={() => handleComment(cdIdx)}>접기</button>
                                        :
                                        <button onClick={() => handleOpen(cdIdx)}>펼치기</button>
                                    }
                                    <hr />
                                </div>
                                {open && commentIdx == cdIdx && <div>
                                    <input type="text" onChange={(e) => setComment(e.target.value)} />
                                    <button onClick={() => submitComment(cdIdx)}>등록</button>
                                </div>}

                                <div>
                                    {cdFile && (
                                        <div>
                                            <Waveform
                                                src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getMusic/${cdFile}`}
                                            />
                                            <a href={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/CommissionDown/${cdFile}`}><button>다운로드</button></a> &nbsp; &nbsp;
                                            <button onClick={() => handleFileDel(cdIdx)}>파일 삭제</button>
                                        </div>
                                    )}
                                </div>
                                <hr />
                            </div>

                        </div>
                    );
                })}


                <br />

                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
                <input type="file" multiple="multiple" onChange={(e) => setMusic(e.target.files)} />
                <button onClick={handleSubmit}>등록</button>
                &nbsp;  &nbsp; &nbsp;
                <Link to='/partner/doing'><button> 목록으로 </button></Link>
                &nbsp;  &nbsp; &nbsp;
                {money == 0 ? <Link to={`/partner/payment/${userId2}/${cidx}`}><button> 안심결제 </button></Link> : ""}
                &nbsp;  &nbsp; &nbsp;
                {progress == 0 ? <button onClick={handleEnd}> 작업완료 </button> : ""}
                &nbsp;  &nbsp; &nbsp;
            </div>
        </>
    );
};

export default DoingDetail;