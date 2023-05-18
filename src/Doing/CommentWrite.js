import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import style from './Doing.module.css';

const CommentWrite = ({ pcIdx }) => {

    const [pdcComment, setPdcComment] = useState('');

    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userId = decode_token.name;

    const handlerChangePdcContent = e => setPdcComment(e.target.value);
    const handlerSubmit = (e) => {
        e.preventDefault();

        const header = {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        };

        const data = {
            userId : userId,
            pcIdx : pcIdx,
            pdcComment: pdcComment
        }

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/comment/write/${pcIdx}`, data,
            { headers: header })
            .then(response => {
                console.log(response)
                alert("댓글 추가 성공");
            })
            .catch((eroor) => {
                alert("댓글 추가 실패");
            })
    }
    return (
        <>
            <form onSubmit={handlerSubmit}>
                <input className={style.commentWrite} type="text" onChange={handlerChangePdcContent}></input>
                <button className={style.submit}>등록</button>

            </form>
        </>
    );
}

export default CommentWrite;