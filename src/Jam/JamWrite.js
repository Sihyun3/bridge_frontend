import style from "./JamWrite.module.css";
import JamBack from "./Rectangle 49.png";
import JamIcon from "./Polygon 2.png";
import musicfile from './musical-note.png';

const JamWrite = () => {

    return (
        <>
            <div className='container clearfix' >

                <div className={style.title1}>
                    <p className={style.titleName}>Jam</p>
                    <img src={JamBack} className={style.JamBack}></img>
                    <img src={JamIcon} className={style.JamIcon}></img>
                </div>

                <div className={style.box}>
                    <div className={style.titleBox}>
                        <label for="title2" className={style.title2}> 제목 </label>
                        <input type="text" id="title2" className={style.titleInput} />
                    </div>
                    <div className={style.introduceBox}>
                        <label for="introduce" className={style.introduce}>소개글</label>
                        <input type="text" id="introduce" className={style.introduceInput} />
                    </div>

                    <div className={style.potoBox}>
                        <label for="poto" className={style.poto}>사진</label>
                        <input type="file" id="poto" className={style.potofile} />
                    </div>
                    <div className="aa">
                        <button className={style.potoButton}>첨부</button>
                    </div>
                    <div className={style.hr}>
                    <hr width="1100px" color='white' size="1.5"/>
                    </div>
                    <div>
                        <p className={style.Select}> 악기 선택창으로 이동 </p>
                    </div>
                        <img src={musicfile} className={style.musicImg}></img>
                    <div className={style.musicBox}>
                        <label for="musicfile" className={style.musicfile}>음악 파일</label>
                        <input type="file" id="musicfile" className={style.musicInput}></input>
                    </div>
                    <button className={style.musicButton}>첨부</button>

                    <div>
                        <button className={style.submitBtn}>등록</button>
                    </div>

                </div>
            </div>
        </>
    );

}

export default JamWrite;