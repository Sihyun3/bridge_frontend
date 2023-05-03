import style from './NoticePage.module.css';
// import NoticePage from 'react';
import '../reset.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function NoticeDetail({ match }) {

  // const [aIdx, setAIdx] = useState('');
  const { aIdx } = match.params;
  // const [detail, setDetail] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(() => {
    // setAIdx(1);
    axios.get(`http://localhost:8080/api/announcementDetail/${aIdx}`)
      .then(response => {
        console.log("+++++" + response.data);
        setTitle(response.data.atitle);
        setContents(response.data.acontents);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const handleChangeTitle = (e)=>{
    setTitle(e.target.value);
};

const handleChangeContents = (e) => {
  setContents(e.target.value);
};

  return (
    <>
      <h1 className={style.Notice}>공지사항 등록</h1>
      <div className={style.Box}>
        <h1 className={style.Title} >제목</h1>
        <input className={style.TitleBox} value={title} onChange={handleChangeTitle}/>
        <h1 className={style.Contents}>내용</h1>
        <input className={style.ContentsBox} value={contents} onChange={handleChangeContents}/>
        {/*  */}
        <button className={style.Button2} onClick=''>수정</button>
        <button className={style.Button3} onClick=''>삭제</button>
      </div>
    </>
  );
}

export default NoticeDetail;

