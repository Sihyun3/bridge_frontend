import style from './TipList.module.css'
import searchImg from '../Admin-Notice/searchImg.png'
import '../reset.css'
import Header1 from '../Header/Header1'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const TipList = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/tiplist/`)
            .then(r => {
                setData(r.data);
            })
    }, [])

    const [filteredDatas, setFilteredDatas] = useState([]);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [value, setValue] = useState([]);

    return (
        <>
            
            <div className={style.box1}>
                <h1>게시판</h1>
            </div>
            <div className='container clearfix'>
                <div className={style.leftbox}>
                    <button className={style.good}>좋아요순</button>
                </div>
                <div className={style.rightbox}>
                    <input type="text" className={style.search} />
                    <img className={style.searchImg} src={searchImg} />
                </div>
                <div className={style.write}>
                    <button className={style.writebutton} onClick={() => {
                        history.push('/bridge/tip/write')
                    }}>작성</button>
                </div>
                {
                    data.map((data) => {
                        console.log(data.tbIdx)
                        return (
                            <Link to={`/bridge/tip/detail/${data.tbIdx}`} className={style.list}>
                                <a className={style.title}>{data.tbTitle}</a>
                                <a className={style.heart}>♡</a>
                                <a className={style.count}>{data.tbHeart}</a>
                                <a className={style.writer}>{data.userId}</a>
                            </Link>
                        )

                    })
                }
                <div className={style.page}>

                    <nav className="pageNum" >
                        <button onClick={() => setPage(page - 1)} disabled={page === 1} >
                            &lt;
                        </button>
                        {
                            filteredDatas && Array(Math.ceil(filteredDatas.length / limit)).fill().map((page, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    aria-current={page === i + 1 ? "page" : null}
                                >
                                    {i + 1}
                                </button>
                            ))}

                        {
                            filteredDatas == "" && Array(Math.ceil(data.length / limit)).fill().map((page, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    aria-current={page === i + 1 ? "page" : null}
                                >
                                    {i + 1}
                                </button>
                            ))}

                        {
                            filteredDatas == "" && data ?
                                <button onClick={() => setPage(page + 1)} disabled={page == Math.ceil(data.length / limit)}>
                                    &gt;
                                </button>
                                :
                                <button onClick={() => setPage(page + 1)} disabled={page == Math.ceil(filteredDatas.length / limit)}>
                                    &gt;
                                </button>
                        }
                    </nav>
                </div>
            </div>

        </>
    )
}

export default TipList;