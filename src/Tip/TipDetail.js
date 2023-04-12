import style from './TipDetail.module.css'
import { Route, Link } from 'react-router-dom';
import back_button from 'C:/bridge/bridge_frontend/src/Tip/back-button.png'
const TipDetail = () => {
    return (
        <div>

            <div className={style.back}>
                <img className={style.backbutton} src={back_button} />
            </div>
            <div className={style.title}>
                <h2>어플로 기타 줄 잘 조율하는 꿀팁</h2>
                <br /><br />
                <p>조회수:00</p>
            </div>
            <div className={style.line}></div>
            <div className={style.content}>
                <p>멀리 가을 나의 있습니다. 나는 못 별 오는 사람들의 봅니다. 슬퍼하는 우는 묻힌 마리아 하나의 별들을 사람들의 하나에 있습니다. 노새, 가슴속에 경, 계십니다. 언덕 위에 헤일 않은 이웃 추억과 오면 벌써 이름자 계십니다. 피어나듯이 언덕 덮어 별을 무성할 이 있습니다. 하나의 언덕 이름과, 위에도 이름과 봅니다. 별에도 별빛이 헤는 하나에 이네들은 계십니다. 책상을 동경과 묻힌 이국 별 쓸쓸함과 다 이런 별빛이 거외다. 라이너 이국 지나가는 멀리 하늘에는 있습니다. 당신은 가을 나의 별에도 아스라히 거외다.어머니 추억과 했던 릴케 위에 불러 듯합니다. 별을 나의 것은 위에도 소녀들의 아침이 청춘이 있습니다. 걱정도 불러 하나에 새워 가을 봄이 있습니다. 흙으로 릴케 별 보고, 봅니다. 잔디가 다 릴케 노루, 나는 까닭입니다. 별 이네들은 둘 다 이런 추억과 별 언덕 하나에 거외다. 불러 흙으로 하나에 있습니다. 보고, 이름을 까닭이요, 이웃 듯합니다. 가난한 하늘에는 이 이름자 어머니, 라이너 이웃 듯합니다. 가난한 덮어 지나가는 듯합니다. 옥 그러나 아스라히 버리었습니다.아무 시인의 다 불러 이웃 무엇인지 봅니다. 아무 그리워 보고, 위에 아직 책상을 헤일 이름과 나의 까닭입니다. 사람들의 멀듯이, 이름과, 버리었습니다. 걱정도 했던 패, 듯합니다. 별 시와 겨울이 별들을 남은 이름을 딴은 하나에 있습니다. 둘 아스라히 어머니 그리고 어머님, 했던 오는 것은 있습니다. 지나가는 하나에 계집애들의 계십니다. 가득 하나의 토끼, 이름과 어머니, 청춘이 위에 버리었습니다. 하나에 이런 파란 별 청춘이 보고, 거외다. 이름자를 가득 패, 가슴속에 듯합니다. 비둘기, 토끼, 덮어 아침이 소학교 않은 이제 아스라히 가을 까닭입니다.</p>
            </div>
            <div className={style.heartbox}>
                <i>♡</i>
            </div>
            <div className={style.editbox}>
                <ul>
                    <li><Link to="/">삭제</Link></li>
                    <li>수정</li>
                </ul>
            </div>
            <div className={style.line}></div>
        </div>
    )
}

export default TipDetail;