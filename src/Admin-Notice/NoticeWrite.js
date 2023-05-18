
import { useEffect, useState } from 'react';
import style from './NoticeWrite.module.css';
import axios from 'axios';
// import Notice from './notice/NoticePage';
// import '../reset.css';
import NoticeToastEditor from '../Component/NoticeToastEditor.js'
import jwt_decode from "jwt-decode";




function NoticeWrite({history}) {

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            alert(`로그인이 필요합니다. 로그인해주세요`);
            history.push('/login')
            return;
          }
          const token = sessionStorage.getItem('token');
          const decode_token = jwt_decode(token);
          console.log(">>>>>>>>>>>>> " + decode_token);

          if (decode_token.sub != 'admin') {
            alert(`관리자만 이용할 수 있습니다`);
            history.push(`/`)
          }
    }, [])

    // const [notice, setNotice] = useState({});
  

    // const handlerChangeTitle = e => setTitle(e.target.value);
    // const handlerChangeContents = e => setContents(e.target.value);
    // const save = () => {
    //     axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/write`,
    //     { title, contents },  {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}}
    //     )              // 요청 본문을 통해서 서버로 전달할 값
    //         .then(response => {
    //             console.log(response);                             // 수정 결과에 대한 메시지 처리
    //                 alert(response.data);
    //                 history.push('/notice');
    //         })
    //         .catch(error => {
    //             console.log(error);						// 200번대를 제외한 응답코드가 반환되는 경우
    //             console.log(error);
    //             alert(`에 실패했습니다. (${error.message})`);
    //             return;
    //         });

    // };

    return (
        <>
           <div className="container">
            <div className={style.topbox}>
                <input className={style.titlebox} value={title} onChange={(e) => { setTitle(e.target.value) }} type='text' placeholder='제목'></input>
            </div>
            <div className={style.writebox}>
            <NoticeToastEditor title={title}/>
            </div>
        </div>
        </>
    );
}

export default NoticeWrite;