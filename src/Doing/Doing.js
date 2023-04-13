import style from './Doing.module.css'
import '../reset.css';
import Header1 from '../Header/Header1';
import img from "../img/checkbox.png"

function Doing() {

    return (
        <>
            <Header1 />
            <div className='box1'>
                <h1>게시판</h1>
            </div>
            <div className='container'>
                <div className={style.Doing} >
                    <p className={style.teamname}>Team Name</p>
                    <p className={style.isDoing}>현재 작업이 <b style={{fontWeight:"bold"}}>진행 중</b> 입니다</p>
                    <div className={style.upload}>업로드</div>
                    <div className={style.contents}>
                        <p className={style.date}>2023년 4월 7일</p>
                        <div className={style.Doingbox}>
                            <img className={style.img} src={img}/>
                            <p className={style.name}>의뢰인</p>
                            <p className={style.contents}>예치금 10,000 원이 결제 되었습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} export default Doing;