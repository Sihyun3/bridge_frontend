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

    // const token = sessionStorage.getItem('token');
    //     const decodedToken = jwt_decode(token);
    //     console.log(decodedToken);
    //     setUserNickname(decodedToken.userNickname);

    //     axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getlike`)
    //         .then(response => {
    //             console.log(response);
    //             setLikeCt(response.data.LikeCt);
    //         })
    //         .catch(error => console.log(error));
    // }, []);

    // const likeUpdateHandler = () => {
    //     setLikeUpdate(!likeUpdate)
    //   }

    // const LikeCountHandler = () => {
    //     likeUpdateHandler()
        
    // if (!likeUpdate) {
    //     setLikeCt(LikeCt +1)
    //     axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/like/${tb_heart}`, {})
    //     .then(response => {                           
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         return;
    //     });
    // } else if (likeUpdate) {
    //     setLikeCt(LikeCt -1)
    //     axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/unlike/${tb_heart}`, {})
    //     .then(response => {                           
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         return;
    //     });
    // }} 


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
            <Link to="/tip/list"><div className={style.back}>
                <img className={style.backbutton} src={back_button} />
            </div></Link>
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
                    <li><Link to={`/bridge/tip/edit/${data.tbIdx}`}></Link>수정</li>
                </ul>
            </div>
            <div className={style.line}></div>
            <div className={style.comment}><h2>댓글</h2></div>
            <div className={style.com}>
                {comments.map((data, idx) => {
                    return (
                        <div className={style.comments} style={{ width: 1000, marginLeft: 80, height: 40, float: "left", lineHeight: "40px" }}  >
                            <div style={{ width: "100px", float: "left" }} > {data.userId} </div>
                            <div> {data.tbcComments}</div>
                        </div>
                    )
                })}
            </div>
            <div className={style.line}></div>
            <div className={style.input}>
                <div style={{ margin: "0 auto", width: "900px" }}>
                    <input type='text' value={temp} onChange={(e) => { setTemp(e.target.value) }} className={style.writeComment} />
                    <input type="button" className={style.finish} onClick={insert} value="등록" />
                </div>
            </div>
        </div>
    )
}

export default TipDetail;