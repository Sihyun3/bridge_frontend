
import { useEffect, useState } from 'react';
import style from './NoticeWrite.module.css';
import axios from 'axios';
// import Notice from './notice/NoticePage';
// import '../reset.css';




function NoticeWrite({history}) {


    // const [notice, setNotice] = useState({});
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const handlerChangeTitle = e => setTitle(e.target.value);
    const handlerChangeContents = e => setContents(e.target.value);
    const save = () => {
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/write`,
        { title, contents },  {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}}
        )              // 요청 본문을 통해서 서버로 전달할 값
            .then(response => {
                console.log(response);                             // 수정 결과에 대한 메시지 처리
                    alert(response.data);
                    history.push('/notice');
            })
            .catch(error => {
                console.log(error);						// 200번대를 제외한 응답코드가 반환되는 경우
                console.log(error);
                alert(`수정에 실패했습니다. (${error.message})`);
                return;
            });

    };

    return (
        <>
            <h1 className={style.Notice}>공지사항 등록</h1>
            <div className={style.Box}>
                <h1 className={style.Title}>제목</h1>
                <input className={style.TitleBox} type="text" id="title" name="title" value={title} onChange={handlerChangeTitle} />
                {/* <input className={style.TitleBox} /> */}
                <h1 className={style.Contents}>내용</h1>
                <textarea className={style.ContentsBox} title="내용" id="contents" name="contents" value={contents} onChange={handlerChangeContents}></textarea>
                <button className={style.Button1} onClick={save} han >등록</button>
            </div>
        </>
    );
}

export default NoticeWrite;