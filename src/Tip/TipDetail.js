import style from './TipDetail.module.css'
import { Route, Link } from 'react-router-dom';
import back_button from './back-button.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Viewer } from '@toast-ui/react-editor';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const TipDetail = ({ match }) => {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const tb_idx = match.params.tbIdx;
    const [temp, setTemp] = useState()
    const history = useHistory();
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/tipdetail/${tb_idx}/1`)
            .then(r => {
                setData(r.data.tipDetail);
                setComments(r.data.commentsList);
                console.log(r.data)
            })
    }, [])


    const insert = (e) => {
        e.preventDefault();
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comment`,
            { "tbIdx": tb_idx, "tbcComments": temp },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        ).then(() => {
            console.log("asdasdasd")
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/comments/${tb_idx}`)
                .then(r => {
                    console.log(r.data)
                    setComments(r.data)
                })
        }
        )
        setTemp("");
    }

    const handlerdelete = () => {
        const token = sessionStorage.getItem('token')
        const decode = jwtDecode(token);
        if (decode.sub != data.userId) {
            alert('작성자만 삭제 가능합니다.');
            history.push('/')
        }
        console.log(decode.sub);
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/tip/delete/${tb_idx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(() => {
                alert("성공적으로 삭제 되었습니다.")
                history.push('/bridge/tip/list')

            })
            .catch(() => {
                alert("삭제에 실패했습니다.")
            })
    }


    return (
        <div className='container clearfix' >
            <div className={style.back}>
                <img className={style.backbutton} src={back_button} />
            </div>
            <div className={style.title}>
                <h1>{data.tbTitle}</h1>
                <br /><br />
                <p>조회수:{data.tbViews}</p>
                <p>작성일:{data.tbCreatedt}</p>
            </div>
            <div className={style.line}></div>
            <div className={style.content}>
                {data.tbContents && <Viewer initialValue={data.tbContents}></Viewer>}
            </div>
            <div className={style.heartbox}>
                <i onClick={handlerHeart}>{data.tbHeart} ♡</i>
            </div>
            <div className={style.editbox}>
                <ul>
                    <li onClick={handlerdelete}> 삭제</li>
                    <li><Link to={`/bridge/tip/edit/${data.tbIdx}`}></Link>수정</li>
                </ul>
            </div>
            <div className={style.line}></div>
            <div className={style.comment}><h2>댓글</h2></div>
            <div className={style.com}>
            {comments.map((data, idx) => {
                return (
                    <div className={style.comments} style={{ width: 1000, marginLeft:80 ,height:40, float:"left",lineHeight:"40px"}}  >
                        <div style={{width:"100px",float:"left"}} > {data.userId} </div>
                        <div> {data.tbcComments}</div>
                    </div>
                )
            })}
            </div>
            <div className={style.line}></div>
            <div className={style.input}>
                <div style={{margin: "0 auto",width:"900px"}}>
                <input type='text' value={temp} onChange={(e) => { setTemp(e.target.value) }} className={style.writeComment} />
                <input type="button" className={style.finish} onClick={insert} value="등록" />
                </div>
            </div>
        </div>
    )
}

export default TipDetail;