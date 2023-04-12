import style from './NoticePage.module.css';
// import NoticePage from 'react';
import '../reset.css';


function NoticeDetail() {
    return (
      <>
        <h1 className={style.Notice}>공지사항 등록</h1>
        <div className={style.Box}>
          <h1 className={style.Title}>제목</h1>
          <input className={style.TitleBox} />
          <h1 className={style.Contents}>내용</h1>
          <input className={style.ContentsBox} />
          <button className={style.Button2} onClick=''>수정</button>
          <button className={style.Button3} onClick=''>삭제</button>
        </div>
      </>
    );
  }

export default NoticeDetail;