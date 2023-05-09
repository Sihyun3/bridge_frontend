import style from './JamDetail.module.css'
import play from './play.png'
import note from './note.png'
import { useState, useEffect, useRef } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import Waveform from '../Component/Waveform';
const JamDetail = ({match}) => {
    //잼소개 부분
    const [info, setInfo] = useState({});
    const [value, setvalue] = useState([]);
    const child = useRef([]);
    //음악 등록부분
    const [music, setMusic] = useState('');
    const [instrument, setInstrument] = useState('');
    // 코멘트
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const cIdx = match.params.cIdx;
    
    //추가
    const [insert, setInsert] = useState(0);
    const [data, setData] = useState([]);

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    //음악 업로드 페이지
    const onSubmit = (e) => {
        e.preventDefault();
        let files = music;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        let datas = { "cmInstrument": instrument }
        formData.append("data", new Blob([JSON.stringify(datas)], { type: "application/json" }))
        axios({
            method: 'POST',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertmusic/${cIdx}`,
            headers: { 'Content-Type': 'multipart/form-data;', 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
            data: formData
        }).then((response) => {
            console.log("축 성공");
            let musicInfo = { instrument: instrument, musicUUID: response.data.uuid }
            setData([...data, musicInfo]);
        }).catch(() => {
            alert(`업로드 중 오류가 발생했습니다.`);
        });
        window.location.reload();
    }
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/jam/${cIdx}`)
            .then(response => {
                setData(response.data.music);
                setInfo(response.data.data)
                setCommentsList(response.data.commentsList)
                console.log(response.data.music);
                console.log(response.data);
            })
    }, [])

    const onCheckAll = (isChecked) => {
        if (isChecked) {
            const indexArray = data.map((music, index) => index);
            setvalue(indexArray);
        } else {
            setvalue([]);
        }
    }
    const allplay = () => {
        value.forEach((index) => {
            child.current[index].PlayAll();
        });
    }
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if(comment == ""){
            alert('작성된 내용이 없습니다')
            return;
        }
        //cIdx 부분 1번으로 하드코딩==> 수정 필요
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertComments/${cIdx}`, {  "ccComments": comment },
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            .then(response => {
                console.log(response);
                setInsert(insert + 1);
                alert('코맨트가 정상적으로 등록되었습니다')

            })
            .catch(error => {
                alert("로그인 해주세요"); 
            });
    };

    // 코멘트 삭제 핸들러
    const handlerClickDelete = (e) => {
        e.preventDefault();
                axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/CommentsDelete/${e.target.value}`)
            .then(response => {
                console.log(response);
                if (response.data === 1) {
                    alert('정상적으로 삭제되었습니다.');
                    // history.push('/insertComments');				// 정상적으로 삭제되면 목록으로 이동
                } else {
                    alert('삭제에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
            window.location.reload();

    };

    return (
        <>
            <div className='container clearfix'>
                <div className={style.title}>
                    <h1>{info.ctitle} </h1>
                    <br /><br />
                    <p>{info.ccontents}</p>
                </div>

                <div className={style.playbox}>
                    <img className={style.playbutton} src={play} onClick={allplay} />
                    <div>
                        <input type="checkbox" checked={value.length === data.length} onChange={(e) => onCheckAll(e.target.checked)} />
                        <span>전체 선택</span>
                    </div>  
                    {/* 여기에 플레이 바 추가해야함 */}
                    {/* <button onClick={allplay}>All Play/Pause</button> */}

                </div>
                <div className={style.jam}>
                    <div>

                        {data.map((musicInfo, index) => {
                            return (
                                <div key={musicInfo.musicUUID}>
                                    {/* <img className={style.instrument} src={play} /> */}
                                    {/* 체크박스 */}
                                    <input
                                        type="checkbox"
                                        checked={value.includes(index)}

                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setvalue([...value, index]);
                                            } else {
                                                setvalue(value.filter((v) => v !== index));
                                            }
                                        }}
                                    />
                                    {/* 파형 */}
                                    <Waveform
                                        data={data}
                                        key={musicInfo.musicUUID}
                                        src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getMusic/${musicInfo.cmMusic}.mp3`}
                                        ref={(elem) => (child.current[index] = elem)}
                                    />
                                    {/* 노래제목 */}
                                    {musicInfo.musicTitle}
                                </div>
                            );
                        })}  {/* 맵 끝*/}
                        {/* 여기에 플레이 바 추가해야함 */}
                    </div>
                    <div className={style.input}>
                        {/* <img className={style.singlenote} src={note} onclick /> */}
                        <select className={style.Select} onChange={(e) => { setInstrument(e.target.value) }} style={{ outlineStyle: "none",marginBottom: 21 , verticalAlign:"bottom", marginRight: 20 }} >
                            <option value="" disabled selected>악기 선택</option>
                            <option value="베이스">베이스  </option>
                        </select>

                        {/* <input tyep="file" className={style.music} /> */}
                        <input type="file" className={style.musicinput } multiple="multiple" onChange={(e) => { console.log(e.target.files[0].name); setMusic(e.target.files) }} />
                        <input type="button" className={style.music} onClick={onSubmit} value="등록" />
                    </div>
                </div>
                <div className={style.jam}>
                        <input type="text" value={comment} onChange={handleChangeComment}  ></input>
                        <button onClick={handleCommentSubmit} >등록</button>
                        {
                            commentsList.map((comment)=>{
                                return(
                                    <>
                                <div>{comment.userId}</div>
                                <div>{comment.cdate}</div>
                                <div>{comment.ccComments}</div>
                                <button value={comment.ccIdx} onClick={handlerClickDelete}>삭제</button>
                                </>

                                )
                            })
                        }
                </div>
            </div>
        </>
    )
}

export default JamDetail;