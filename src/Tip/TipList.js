
import style from './TipList.module.css'
import searchImg from 'C:/bridge/bridge_frontend/src/Admin-Notice/searchImg.png'

const TipList = () => {
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
                <h1>게시판</h1>
            </div>
            <div className={style.leftbox}>
                <button className={style.good}>좋아요순</button>
            </div>
            <div className={style.rightbox}>
                <input type="text" className={style.search} />
                <img className={style.searchImg} src={searchImg}/>
            </div>
            <div className={style.write}>
            <button className={style.writebutton}>작성</button>
            </div>
            <div className={style.list}>
                <a className={style.title}>제목</a>
                <a className={style.heart}>♡</a>
                <a className={style.count}>00</a>
                <a className={style.writer}>작성자</a>
            </div>
            <div className={style.list}>
                <a className={style.title}>제목</a>
                <a className={style.heart}>♡</a>
                <a className={style.count}>00</a>
                <a className={style.writer}>작성자</a>
            </div>
        </>
    )


}

export default TipList;