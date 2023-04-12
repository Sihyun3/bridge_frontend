import style from './Notice.module.css'
import searchImg from 'C:/tantara/tantara_frontend/src/TipList/searchImg.png'

const Notice = () => {
    return (
        <>
            <div className={style.nav}>
                <ul className={style.menu}>
                    <li>메인 </li>
                    <li>온라인 합주</li>
                    <li>파트너 구인</li>
                    <li>팁 게시판</li>
                    <li>음원 분리</li>
                </ul>
            </div>
            <div className={style.box1}>
                <h1>공지사항</h1>
            </div>
            <div className={style.leftbox}>
                <button className={style.date}>작성일자</button>
            </div>
            <div className={style.rightbox}>
                <input type="text" className={style.search} />
                <img className={style.searchImg} src={searchImg} />
            </div>
            <div className={style.write}>
                <button className={style.writebutton}>작성</button>
                <button className={style.delete}>삭제</button>
            </div>
            <div className={style.list}>
                <input type="checkbox" className={style.checkbox}/>
                <a className={style.title}>제목</a>
                <a className={style.writer}>작성자</a>
            </div>
            <div className={style.list}>
                <input type="checkbox" className={style.checkbox}/>
                <a className={style.title}>제목</a>
                <a className={style.writer}>작성자</a>
            </div>
           
        </>
    )


}

export default Notice;