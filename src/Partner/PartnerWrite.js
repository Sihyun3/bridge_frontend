import style from "./PartnerWrite.module.css";
import "../reset.css";

const PartnerWrite = () => {

    return (
        <>
            <div className={style.mainBox}>
                <h1 className={style.mainText}>파트너 모집 작성</h1>
                <div className={style.content}>
                    <div className={style.title}>
                        <span className={style.titleText}>제목: </span> <input type="text" className={style.titleInput}></input>
                    </div>
                    <div className={style.period}>
                        <span className={style.periodText}>기간: </span>
                            <input type='date' className={style.periodInput1}/>
                        -
                            <input type='date' className={style.periodInput2} />
                    </div>
                    <div className={style.money}>
                        <span className={style.moneyText}>금액: </span>
                        <input type="text" className={style.moneyInput}></input>
                    </div>
                    <div className={style.tag}>
                        <span className={style.tagText}>태그: </span>
                        <input type="text" className={style.tagInput}></input>
                    </div>
                    <div className={style.image}>
                        <span className={style.imageText}>이미지: </span>
                        <input type="file" className={style.imageInput}></input>
                        <button className={style.imageButton}>첨부</button>
                    </div>
                    <div className={style.intro}>
                        <span className={style.introText}>소개글: </span>
                        <input type="text" className={style.introInput}></input>
                    </div>
                    <div className={style.regist}>
                    <button className={style.registButton}>등록</button>
                    </div>
                </div>
                
            </div>
        </>
    )
};

export default PartnerWrite;