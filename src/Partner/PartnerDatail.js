import Header1 from '../Header/Header1'
import style from '../Partner/PartnerDatail.module.css'
import back_button from '../Tip/back-button.png'
import writer from '../Partner/note.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const PartnerDatail = ({ match }) => {

    const { crIdx } = match.params;
    
    const [data, setData] = useState('');
    const [tag, setTag] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/openPartnerDetail/${crIdx}`)
            .then((response) => {
                setData(response.data.partnerList);
                setTag(response.data.partnerTag);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const handleDelete = () => {
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/deletePartner/${crIdx}`)
            .then((response) => {
                alert(`정상적으로 삭제되었습니다`)
                history.push(`/bridge/partner/list`);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <>
            <div className='container clearfix' >
                <Link to='/bridge/partner/list'>
                    <div className={style.back}>
                        <img className={style.backbutton} src={back_button} />
                    </div>
                </Link>
                <div className={style.writer}>
                    {/* 유저 프로필 사진 정보 가져오는 것 필요 */}
                    <img className={style.writerimg} src={writer} />
                    <p>{data.userId}</p>
                </div>
                <div className={style.imgbox}>
                    <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getImage/${data.crPhoto}`} />
                </div>
                <div className={style.content}>
                    <div className={style.title}> <h2>{data.crTitle}</h2>
                    </div>
                    <div className={style.date}>
                        <p>작성일: {data.createdDt} </p>
                    </div>
                    <div className={style.duration}>
                        <p>기간: {data.crStartDate}~{data.crEndDate}</p>
                    </div>
                    <div className={style.pay}>
                        <p>금액: {data.crMoney} 원</p>
                    </div>
                    <div className={style.taglist}>
                        {tag.map((tag) => {
                            return (
                                <span className={style.tags}>#{tag.crtTag}</span>
                            )
                        })}
                    </div>
                </div>
                {/* 신청하기 버튼 클릭시 해당 유저와 채팅 연결 필요 */}
                <div className={style.buttonbox}>
                    <button> 신청하기</button>
                </div>
                <div className={style.buttonbox2}>
                <button onClick={handleDelete}>삭제하기</button>
                </div>
              
                <div className={style.line}></div>
                <div className={style.detail}>
                    
                    <p>{data.crContents}</p>
                </div>
                <div className={style.line}></div>
            </div>

        </>
    )
}

export default PartnerDatail;