import style from "./PartnerWrite.module.css";
import "../reset.css";

const PartnerWrite = () => {

    return (
        <>
        <div className={style.mainBox}>
        <h1 className={style.mainText}>파트너 모집 작성</h1>
            <div>
                <div className={style.title}>
                <input id="title" type="text" className={style.textTitle} placeholder="제목을 입력하세요."></input>
                </div>
                <div>
                    <span className="Date1">
                    <input type='date' style={{border:"none", marginTop:"3px", backgroundColor:"#D2B9FB"}} /> 
                    </span>
                    -
                    <span>
                    <input type='date' className="Date2" style={{border:"none", marginTop:"3px", backgroundColor:"#D2B9FB"}}/>
                    </span>
                </div>
              
            </div>
            <button>등록</button>
            </div>
        </>
    )
};

export default PartnerWrite;