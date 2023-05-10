import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const CommentWrite = ({ pcIdx, setCommentUpload, setIsClick1 }) => {

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

        axios.post(`http://localhost:8080/api/bridge/partnerdetail/comment/write/${pcIdx}`, data,
            { headers: header })
            .then(response => {
                console.log(response)
                alert("댓글 추가 성공");
                setCommentUpload(false);
                setIsClick1(false);
            })
            .catch((eroor) => {
                alert("댓글 추가 실패");
            })
    }
    return (
        <>
            <form onSubmit={handlerSubmit}>
                <input type="text" onChange={handlerChangePdcContent}></input>
                <button>등록</button>

            </form>
        </>
    );
}

export default CommentWrite;