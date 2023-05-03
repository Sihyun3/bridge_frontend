import { useEffect } from 'react'
import style from './Notice.module.css'

import searchImg from './searchImg.png'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Notice = () => {

    const [data, setData] = useState([]);
    const [aIdx, setAIdx] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/announcementList`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, [])


    return (
        <>
    
            <div className={style.nav}>
                <ul className={style.menu}>
                    <li>메인 </li>
                    <li>온라인 합주</li>
                    <li>파트너 구인</li>
                    <li>팁 게시판</li>
                    <li>음원 분리</li>
                </ul>
            </div>
            <div className={style.box1}>
                <h1>공지사항</h1>
            </div>
            <div className='container clearfix'>
            <div className={style.leftbox}>
                <button className={style.date}>작성일자</button>
            </div>
            <div className={style.rightbox}>
                <input type="text" className={style.search} />
                {/* <img className={style.searchImg} src={searchImg} /> */}
            </div>
            <div className={style.write}>
                {/* 관리자 아이디일때만 버튼 보이도록 수정 필요*/}
                <button className={style.writebutton}>작성</button>
                {/* <button className={style.delete}>삭제</button> */}
            </div>
                {
                    data.map((announcement) => {
                        return(
                        <div className={style.list}>
                        {/* <input type="checkbox" className={style.checkbox} /> */}
                        {/* className={style.title} */}
                        <Link to={`/api/announcementDetail/${announcement.aidx}`} className={style.title}>{announcement.atitle}</Link>
                        <a className={style.writer}>{announcement.adate}</a>
                    </div>
                        )
                    })
                }
        </div>
        </>
    )


}

export default Notice;