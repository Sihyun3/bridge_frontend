import Header1 from '../Header/Header1'
import style from '../Partner/PartnerDatail.module.css'
import back_button from 'C:/bridge/bridge_frontend/src/Tip/back-button.png'
import writer from '../Partner/note.png'
import cat from '../Partner/cat.jpg'

const PartnerDatail = () => {
    return (
        <>
            <div className='container clearfix' >
                <div className={style.back}>
                    <img className={style.backbutton} src={back_button} />
                </div>
                <div className={style.writer}>
                    <img className={style.writerimg} src={writer} />
                    <p>작성자 닉네임</p>
                </div>
                <div className={style.imgbox}>
                    <img src={cat} />
                </div>
                <div className={style.content}>
                    <h2>(제목) 어쿠스틱 기타 등등 연주자 구합니다.</h2>
                    <br /><br /><br /><br /><br />
                    <p>기간.00.00~2023.00.00</p>
                    <br />
                    <p>금액: 50,000</p>
                    <div className={style.taglist}>                 
                        <span>#여성보컬</span>
                        <span>#베이스기타</span>
                        <span>#플룻</span>
                        <span>#여성보컬</span>
                        <span>#플룻</span>
                        <span>#베이스기타</span>                       
                    </div>
                </div>
                <div className={style.buttonbox}>
                    <button> 신청하기</button>
                </div>
                <div className={style.line}></div>
                <div className={style.detail}>
                    <p>(상세 설명)나의 걱정도 슬퍼하는 패, 내 봅니다. 애기 멀리 말 하나에 나의 봅니다. 강아지, 아무 어머니, 청춘이 하나에 그러나 별 봅니다. 멀리 어머니, 어머님, 하나에 애기 아침이 별 별 별들을 계십니다. 이제 언덕 헤일 이름자 아름다운 묻힌 가득 언덕 나의 거외다. 토끼, 소녀들의 슬퍼하는 이름자 걱정도 때 봅니다. 하늘에는 별에도 듯합니다. 이름과, 이름을 내린 까닭입니다. 소학교 가을로 이런 없이 같이 이름을 무성할 까닭입니다.비둘기, 이름과, 너무나 거외다. 별 잠, 하나에 별 아직 있습니다. 보고, 책상을 벌레는 별을 이름과, 밤이 계십니다. 라이너 하나에 위에 한 어머니 이름과, 있습니다. 위에 이런 이국 딴은 버리었습니다. 불러 노루, 어머니, 별이 벌레는 겨울이 봅니다. 이런 어머님, 나의 언덕 마리아 겨울이 책상을 지나고 까닭입니다. 위에 했던 당신은 차 어머님, 새워 별들을 버리었습니다. 이름과, 것은 별 이국 벌써 이름을 버리었습니다.무덤 가을 보고, 있습니다. 가슴속에 쉬이 이런 벌레는 당신은 릴케 까닭입니다. 오는 내일 하나에 자랑처럼 것은 멀리 동경과 거외다. 하늘에는 소녀들의 묻힌 노새, 이런 이름과, 멀리 계절이 있습니다. 이름과, 언덕 이름자 아름다운 책상을 봄이 그리고 이런 노루, 봅니다. 언덕 별 그리고 풀이 나는 아무 봅니다. 가난한 써 무성할 새워 하나에 거외다. 오면 경, 지나고 계십니다. 이름을 둘 오는 내 무덤 하나에 이름자 슬퍼하는 소녀들의 듯합니다. 가을 지나가는 내일 계절이 봅니다.</p>
                </div>
                <div className={style.line}></div>
            </div>

        </>
    )
}

export default PartnerDatail;