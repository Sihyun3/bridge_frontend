import Header1 from '../Header/Header1'
import style from '../Partner/PartnerDatail.module.css'
import back_button from '../Tip/back-button.png'
import writer from '../Partner/note.png'
import cat from '../Partner/cat.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'

const PartnerDatail = ({ match }) => {

    const { crIdx } = match.params;

    const [data, setData] = useState('');
    const [tag, setTag] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/openPartnerDetail/${crIdx}`)
            .then((response) => {
                setData(response.data.partnerList);
                setTag(response.data.partnerTag);
            })
            .catch((error) => {
                console.log(error);
            });
    },[])


    return (
        <>
            <div className='container clearfix' >
                <div className={style.back}>
                    <img className={style.backbutton} src={back_button} />
                </div>
                <div className={style.writer}>
                    {console.log(">>>>>>>>" + data.crPhoto)}
                    <img className={style.writerimg} src={`cat`} />
                    {console.log(">>>>>>>>" + data.crPhoto)}
                    <p>{data.userId}</p>
                </div>
                <div className={style.imgbox}>
                    <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getImage/${data.crPhoto}`} />
                </div>
                <div className={style.content}>
                    <h2>{data.crTitle}</h2>
                    <br /><br /><br /><br /><br />
                    <p>기간: {data.crStartDate}~{data.crEndDate}</p>
                    <br />
                    <p>금액: {data.crMoney} 원</p>
                    <div className={style.taglist}>
                        {tag.map((tag) => {
                            return (
                                <span>#{tag.crtTag}</span>
                            )
                        })}
                    </div>
                </div>
                <div className={style.buttonbox}>
                    <button> 신청하기</button>
                </div>
                <div className={style.line}></div>
                <div className={style.detail}>
                    <p>(상세 설명)</p>
                    <p>{data.crContents}</p>
                </div>
                <div className={style.line}></div>
            </div>

        </>
    )
}

export default PartnerDatail;