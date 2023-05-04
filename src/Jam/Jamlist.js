
import style from './JamList.module.css'
import searchImg from '../Admin-Notice/searchImg.png'
import '../reset.css'
import Header1 from '../Header/Header1'
import img from "./checkbox.png"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
const JamList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/jam')
            .then(r => {
                setData(r.data)
                console.log(r.data)
            })
    }, [])

    return (
        <>
            <Header1 />
            <div className={style.box1}>
                <h1>게시판</h1>
            </div>
            <div className='container clearfix'>
                <Link to="/9"><img className={style.playbutton} src={img}></img></Link>
                <div className='clearfix' style={{ margin: "50px 0" }}>
                    {
                        data.map((data) => {
                            return (
                                <>
                                    <div className={style.block}>
                                        <Link to={`/11/${data.cidx}`}>
                                        <img className={style.img} src={`http://localhost:8080/api/getMusic/${data.cphoto}.jpg`}></img>
                                        <p className={style.title}>{data.ctitle}</p>
                                        </Link>
                                    </div>
                                </>
                            );
                        })
                    }

                    {/* <div className={style.block}>
                        <img className={style.img} src={img}></img>
                        <p className={style.title}>즐겁게 합주해요</p>
                    </div>
                    <div className={style.block}>
                        <img className={style.img} src={img}></img>
                        <p className={style.title}>즐겁게 합주해요</p>
                    </div>
                    <div className={style.block}>
                        <img className={style.img} src={img}></img>
                        <p className={style.title}>즐겁게 합주해요</p>
                    </div> */}

                </div>
            </div>
        </>
    );
}
export default JamList;