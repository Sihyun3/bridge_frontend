import style from './Doing.module.css'
import '../reset.css';
import Header1 from '../Header/Header1';
import img from "./checkbox.png"
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";
import Content from './Content';
import ContentUpdate from './ContentUpdate';

// useEffect(() => {
//     axios.get(`http://localhost:8080/api/bridge/partnerdetail/${pdIdx}`)
//         .then(response => {
//             console.log(response);
//             setContentList(response.data);
//         })
//         .catch(error => console.log(error));

// }, []);

//코멘트

// useEffect(() => {
//     console.log(match);
//     axios.get(`http://localhost:8080/api/bridge/partnerdetail/${pdIdx}/${pcIdx}`)
//     .then(response => {
//         console.log(response);
//         setPdcComment(response.data.pdcComment);

//     })
//     .catch(error =>  {
//         console.log(error);
//         if(error.response.status ===403) {
//             alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
//             history.push('/login');
//         } 
//     });

// }, []);
//게시글


function Doing({ history, match }) {
    const { pcIdx } = match.params;
    const a = 0;
    const pdIdx = 1;
    const [ContentList, setContentList] = useState([]);
    const [pcContent, setPcContent] = useState('');
    const [pcImg, setPcImg] = useState('');
    const [pdcComment, setPdcComment] = useState('');
    const [pcWriter, setPcWriter] = useState('');
    useEffect(() => {
        console.log(match);
        axios.get(`http://localhost:8080/api/bridge/partnerdetail/${pdIdx}`
        )
            // .then(response => {
            //     console.log(response);
            //     setContnetList(response.data)
            //     setPcContent(response.data.pcContent);
            //     setPcImg(response.data.pcImg);
            //     setPcwriter(response.data.pcWriter)

            // })
            .then(response => {
                console.log(response);
                setContentList(response.data);
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
                    history.push('/login');
                }
            });

    }, []);

    return (
        <>
            {/* <Header1 /> */}

            <div className={style.list}>
                <h2>작업 목록</h2>
                <div className={style.doinglist}>
                    <img src={img} />
                    <p>닉네임</p>
                    <p>#악기태그</p>
                </div>
                <div className={style.doinglist}>
                    <img src={img} />
                    <p>닉네임</p>
                    <p>#악기태그</p>
                </div>
            </div>
            <div className='container clearfix'>
                <div className={style.Doing} >
                    <p className={style.teamname}>Team Name</p>
                    <p className={style.isDoing}>현재 작업이 <b style={{ fontWeight: "bold" }}>진행 중</b> 입니다</p>
                    <div className={style.upload}>업로드</div>

                    {ContentList && ContentList.map(content => (
                        <>
                            <div className={style.contentsbox} style={{ marginBottom: '15px' }}>
                                <p className={style.date}>2023년 4월 7일</p>
                                <div className={style.Doingbox}>
                                    <img className={style.img} src={img} />
                                    <p className={style.name}>{content.pcWriter}</p>
                                    <p className={style.contents}>{content.pcContent}</p>
                                    <li className={style.clearfix} >
                                        <ul className={style.button}>{content.pcImg}</ul>
                                        <ul className={style.button}>펼치기</ul>
                                        
                                        <Link to={`/20/${content.pcIdx}`} className={style.btnLink} >수정</Link >
                                    </li>
                                </div>
                            </div>
                            {/* <Link to ={`/themuse/admin/updateinfo/${musical.musicalIdx}`}> */}



                        </>
                    ))
                    }
                    <div>
                        <Content />
                    </div>


                </div>
            </div>
        </>
    )
} export default Doing;