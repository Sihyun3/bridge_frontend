
import style from './TipList.module.css'
<<<<<<< HEAD
import searchImg from 'C:/bridge/bridge_frontend/src/Admin-Notice/searchImg.png'
=======
import searchImg from './searchImg.png'
import '../reset.css'
import Header1 from '../Header/Header1'

>>>>>>> fbaffe88ac03d0591c1e4924f7a56bd41f9327ec

const TipList = () => {
    return (
        <>  
        <Header1/>
            <div className={style.box1}>
                <h1>게시판</h1>
            </div>
            <div className='container clearfix' >
 

                <div className={style.leftbox}>
                    <button className={style.good}>좋아요순</button>
                </div>
                <div className={style.rightbox}>
                    <input type="text" className={style.search} />
                    <img className={style.searchImg} src={searchImg} />
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
            </div>
        </>
    )


}

export default TipList;