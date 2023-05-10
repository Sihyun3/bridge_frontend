import axios from "axios";
import { useState } from "react";

const CommentList = ({pcIdx}) => {

    const [commentList, setCommentList] = useState([{
        writer: '',
        content: ''
    }]);

    axios.get(`http://localhost:8080/api/bridge/partnerdetail/comment/${pcIdx}`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
        .then((response) => {
            console.log(response);
            setCommentList(response.data.map((data) => {
                return ({
                    writer: data.userId,
                    content: data.pdcComment
                })
            })
            )
            console.log(commentList);

        }).catch((error) => {
  
            return;
        })

    return (
        <div>
            <p>{commentList.length? "" : `게시글 작성자aaaaa: ${commentList.writer}`}</p>
            
            <p>{commentList && `게시글 내용: ${commentList.content}`}</p>
        </div>
    );
}

export default CommentList;