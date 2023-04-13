
import style from './JamList.module.css'
import searchImg from '../Admin-Notice/searchImg.png'
import '../reset.css'
import Header1 from '../Header/Header1'
import img from "../img/checkbox.png"
const JamList = () => {


    return (
        <>
            <Header1 />
            <div className={style.box1}>
                <h1>게시판</h1>
            </div>
            <div className='container clearfix'>
                <img className={style.playbutton} src={img}></img>
                <div className='clearfix' style={{margin:"50px 0"}}>
                    <div className={style.block}>
                        <img className={style.img} src={img}></img>
                        <p className={style.title}>즐겁게 합주해요</p>
                    </div>
                    <div className={style.block}>
                        <img className={style.img} src={img}></img>
                        <p className={style.title}>즐겁게 합주해요</p>
                    </div>
                    <div className={style.block}>
                        <img className={style.img} src={img}></img>
                        <p className={style.title}>즐겁게 합주해요</p>
                    </div>
                    <div className={style.block}>
                        <img className={style.img} src={img}></img>
                        <p className={style.title}>즐겁게 합주해요</p>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
export default JamList;