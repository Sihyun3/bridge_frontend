import style from './TipDetail.module.css'
import { Route, Link } from 'react-router-dom';
import back_button from './back-button.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Viewer } from '@toast-ui/react-editor';

const TipDetail = ({ match }) => {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const tb_idx = match.params.tbIdx;
    const [temp, setTemp] = useState()
    useEffect(() => {
        axios.get(`http://localhost:8080/api/tipdetail/${tb_idx}/1`)
            .then(r => {
                setData(r.data.tipDetail);
                setComments(r.data.commentsList);
                console.log(r.data)
            })
    }, [])


    const insert = (e)=>{
        e.preventDefault();
        axios.post(`http://localhost:8080/api/comment`,
        { "tbIdx": tb_idx, "tbcComments" : temp},
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}}
        ).then(()=>{
            console.log("asdasdasd")
            axios.get(`http://localhost:8080/api/comments/${tb_idx}`)
            .then(r=>{
                console.log(r.data)
                setComments(r.data)
            })
        }
        )
        setTemp("");
    }
    return (
        <div className='container clearfix' >
            <div className={style.back}>
                <img className={style.backbutton} src={back_button} />
            </div>
            <div className={style.title}>
                <h2>{data.tbTitle}</h2>
                <br /><br />
                <p>조회수:{data.tbViews}</p>
            </div>
            <div className={style.line}></div>
            <div className={style.content}>
            { data.tbContents && <Viewer initialValue={data.tbContents}></Viewer>}
            </div>
            <div className={style.heartbox}>
                <i>♡</i>
            </div>
            <div className={style.editbox}>
                <ul>
                    <li><Link to={`/7/${data.tbIdx}`}>삭제</Link></li>
                    <li>수정</li>
                </ul>
            </div>
            <div className={style.line}></div>
            <div className={style.comment}><h2>댓글</h2></div>
            <div className={style.comments}>
                {comments.map((data,idx)=>{
                    return(
                        <p><span>{data.userId}</span> : <span> {data.tbcComments}</span></p>
                    )
                })}
               

                {/* <p>작성자: 언덕 하나에 거외다. 불러 흙으로 하나에 있습니다. </p>
                <p>작성자: 인의 다 불러 이웃 무엇인지 봅니다. 아무 그리워 보고, 위에 아직 책상을 헤일 이름과 나의 까닭입니다. 사람들의 멀듯이, 이름과, 버리었습니다.</p> */}
            </div>
            <div className={style.line}></div>
            <div className={style.input}>
                <input type='text' value={temp} onChange={(e)=>{setTemp(e.target.value)}}className={style.writeComment} />
                <input type="button" className={style.finish} onClick={insert} value="등록" />
            </div>
        </div>
    )
}

export default TipDetail;