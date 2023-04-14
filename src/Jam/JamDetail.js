import style from './JamDetail.module.css'
import play from './play.png'
import note from './note.png'

const JamDetail = () => {
    return (
        <>
            <div className='container clearfix'>
                <div className={style.title}>
                    <h1>(제목) 즐겁게 함께 연주해요~! </h1>
                    <br /><br />
                    <p>(소개글)나는 토끼, 하늘에는 새겨지는 벌써 책상을 버리었습니다. 다 너무나 흙으로 별들을 나의 이름을 슬퍼하는 봅니다.</p>
                </div>
                <div className={style.playbox}>
                    <img className={style.playbutton} src={play} onClick />
                    {/* 여기에 플레이 바 추가해야함 */}
                </div>
                <div className={style.jam}>
                    <div>
                        <img className={style.instrument} src={play} />
                        {/* 여기에 플레이 바 추가해야함 */}
                    </div>
                    <div className={style.input}>
                        <img className={style.singlenote} src={note} onclick />
                        <input tyep="file" className={style.musicinput} />
                        <input type="button" className={style.music} onClick value="첨부" />
                        <input type="button" className={style.music} onClick value="등록" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default JamDetail;