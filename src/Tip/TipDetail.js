import style from './TipDetail.module.css'
import { Route, Link } from 'react-router-dom';
import back_button from './back-button.png'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Viewer } from '@toast-ui/react-editor';
import jwtDecode from 'jwt-decode';
// import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';

const TipDetail = ({ match }) => {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const tb_idx = match.params.tbIdx;
    const [temp, setTemp] = useState()
    const history = useHistory();

    // const [likeUpdate, setLikeUpdate] = useState(false)
    // const [LikeCt, setLikeCt] = useState(0)
    // const [userNickname, setUserNickname] = useState('');
    // const tb_heart = match.params.tb_heart;

    

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            alert(`로그인이 필요합니다. 로그인해주세요`);
            history.push('/login')
            return;
        }
        // const token = sessionStorage.getItem('token');
        // const decode_token = jwt_decode(token);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/tipdetail/${tb_idx}/1`)
            .then(r => {
                setData(r.data.tipDetail);
                setComments(r.data.commentsList);
                console.log(r.data)
            })
    }, [])

    const insert = (e) => {
        e.preventDefault();
        if (temp.length >= 100) {
            alert(`작성하신 댓글의 글자수가 100자를 초과합니다 \n 다시 작성해주세요.`);
        }
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
                history.push('/tip/list')

            })
            .catch(() => {
                alert("삭제에 실패했습니다.")
            })
    }


    return (
        <div className='container clearfix' >
            <Link to="/tip/list"><div className={style.back}>
                <img className={style.backbutton} src={back_button} />
            </div></Link>
            <div className={style.title}>
                <h1>{data.tbTitle}</h1>
              
                <p>조회수:{data.tbViews}</p>
                <p>작성일:{data.tbCreatedt}</p>
            </div>
            <div className={style.line}></div>
            <div className={style.content}>
                {data.tbContents && <Viewer initialValue={data.tbContents}></Viewer>}
            </div>
            {/* <div className={style.heartbox}> */}
                {/* <i onClick={handlerHeart}>{data.tbHeart} ♡</i> */}
            {/* </div> */}

            {/* <div className={style.likesBox}>
         <h1 className={style.likes}> Likes  {LikeCt} </h1>
         <br/>
        {likeUpdate ?
          <button onClick={LikeCountHandler}><Icon className={style.heart} icon="material-symbols:heart-plus" /></button>:
          <button onClick={LikeCountHandler}><Icon className={style.heart} icon="material-symbols:heart-minus-outline" /></button>
        }
        </div> */}

            <div className={style.editbox}>
                <ul>
                    <li onClick={handlerdelete}> 삭제</li>
                    <li><Link to={`/tip/edit/${data.tbIdx}`}>수정</Link></li>
                </ul>
            </div>
            <div className={style.line}></div>
            <div className={style.comment}><h2>댓글</h2></div>
            <div className={style.commentall}>
                {comments.map((data, idx) => {
                    return (
                        <div className={style.comments}  >
                            <div style={{ width: "100px", float: "left" }} > {data.userId} </div>
                            <div className={style.text}> {data.tbcComments}</div>
                        </div>
                    )
                })}
            </div>
            <div className={style.line}></div>
            <div className={style.input}>
                <div>
                    <input className={style.writeComment} type='text' value={temp} onChange={(e) => { setTemp(e.target.value) }} />
                    <input type="button" className={style.finish} onClick={insert} value="등록" />
                </div>
            </div>
        </div>
    )
}

export default TipDetail;