import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
// import style from './Notice.module.css'
import style from './NoticeTest.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import style from './Notice.module.css'
import searchImg from './searchImg.png'
// import { Link } from 'react-router-dom'


function Notice({ history, noticeIdx, title  }) {

    const [datas, setDatas] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredDatas, setFilteredDatas] = useState([]);


    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [value, setValue] = useState([]);


    // const [checkBox, setCheckBox] = useState();
    const checkedData = [noticeIdx, title]
    const [checkedArray, setCheckedArray] = useState([]);
    const [checkedList, setCheckedLists] = useState([]);
    const [isChecked, setIsChecked] = useState();
    const [checkingBox, setCheckingBoxs] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/api/notice')
            .then(response => {
                console.log(response);
                setDatas(response.data);
            })
            .catch(error => console.log(error));
    }, []);


    // const [isCheckAll, setIsCheckAll] = useState(false);
    
    // const [checkedArray, setCheckedArray] = useState([]);
    // const [checkedItems, setCheckedItems] = useState(new Set());

    // const handlerCheckBox = (e) => {
    //     setCheckBox(e.target.value);
    // }

    /* 체크박스 전체 */
    const onAllCheckBox = (isChecked) => {
        if (isChecked) {
            const indexArray = datas.map((notice, index) => index);
            setValue(indexArray);
        } else {
            setValue([]);
        }
    }

    // 체크박스 선택

    // const CheckBox = (isChecked) => {
    //     if(isChecked) {
    //         const checkedList = datas.map((notice, index) => index);
    //      setCheckedLists([checkedList]);
    //     } else {
    //      setCheckedLists([]);
    //     console.log("체크되었고 해당 데이터가 체크리스트에 담겼습니다.");
    // };



    const handlerSerchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handlerSerchSubmit = (e) => {
        e.preventDefault();
        const filtered = datas.filter(notice => {
            console.log(`>${searchInput}<`)
            console.log(notice.title.includes(searchInput))
            return notice.title.includes(searchInput)
        }
        );
        console.log(filtered);
        setFilteredDatas(filtered);
        setPage(1);
    }


    const handlerClickDelete = () => {
        axios.delete('http://localhost:8080/api/notice',{ noticeIdx }) 
        
            .then(response => {
                console.log(response);
                if (response.data.length === noticeIdx.length ) {
                    alert('해당 글이 정상적으로 삭제되었습니다.');
                    history.push('/notice');
                } else {
                    alert('삭제에 실패했습니다. 다시 시도해주세요.');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`삭제에 실패하였습니다.(${error.message})`);
                return;
            });
    };

    // const onCheckAll = (isChecked) => {
    //     if (isChecked) {
    //       const indexArray = data.map((music, index) => index);
    //       setvalue(indexArray);
    //     } else {
    //       setvalue([]);
    //     }
    //   }


    const handlerOnclick = () => {
        history.push('/notice/write');
    };

    // const [isCheckAll, setIsCheckAll] = useState(false);
    // const [isCheckedBox, setIsCheckedBox] = useState(false);
    // const [checkedArray, setCheckedArray] = useState([]);
    // const [checkedItems, setCheckedItems] = useState(new Set());

  

//     return (
//         <>
//             {/* <div className='container clearfix'> */}
// const Notice = () => {

//     const [data, setData] = useState([]);
//     const [aIdx, setAIdx] = useState('');

//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/announcementList`)
//             .then(response => {
//                 console.log(response.data);
//                 setData(response.data);
//             })
//             .catch(error => console.log(error));
//     }, [])


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


            <form onSubmit={handlerSerchSubmit}>
                <div className={style.rightbox}>
                    <input type="text" className={style.search} value={searchInput} onChange={handlerSerchInput} placeholder="검색어를 입력하세요" />
                    {/* <img type="button" className={style.searchImg}src={searchImg}  onClick={() => { onSubmit();}}></img> */}
                    <img type="button" className={style.searchImg} src={searchImg} value="검색" onClick={handlerSerchSubmit} />
                </div>
            </form>



            <div className={style.write}>
                <button className={style.writebutton} onClick={handlerOnclick} >작성</button>
                {/* <Link to="/notice/write" className="btn">작성</Link> */}
                <button className={style.delete} value={noticeIdx} onClick={handlerClickDelete}>선택삭제</button>
                <input type="checkbox" checked={value.length === datas.length} onChange={(e) => onAllCheckBox(e.target.checked)} />
                <span>전체선택</span>
                {/* 체크박스 맵 돌린 거 */}
                {datas.map((notice, index) => {
                    return (
                        <div key={notice.noticeIdx}>
                            {/* 체크박스 */}
                            
                        </div>
                 ) })
            }
            </div>

                    {
                        filteredDatas != "" && filteredDatas.slice(offset, offset + limit).map((notice, index) => (
                            <div className={style.list}>
                                <input className={style.checkbox}
                                type="checkbox"
                                checked={value.includes(notice.noticeIdx)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setValue([...value, notice.noticeIdx]);
                                    } else {
                                        setValue(value.filter((v) => v !== notice.noticeIdx));
                                    }
                                }}
                            />

                                {/* <input type="checkbox" className={style.checkbox} value={notice.noticeIdx} checked={value.length === datas.length} onChange={(e) => onAllCheckBox(e.target.checked)}/> */}
                                {/* <div key={notice.noticeIdx}>
                        <div>{notice.noticeIdx}</div> */}
                                {/* <Link to={`/notice/detail/${notice.noticeIdx}`}>{notice.title}</Link></div> */}
                                <Link to={`/notice/detail/${notice.noticeIdx}`}>
                                    <span className={style.title}>{notice.title}</span>
                                    <span className={style.writer}>{notice.userId}</span>
                                </Link>

                                <div>

                                </div>
                            </div>
                        ))
                    }


                    {
                        filteredDatas == "" && datas && datas.slice(offset, offset + limit).map((notice, index) => (
                            <div className={style.list}>
                                  <input className={style.checkbox}
                                type="checkbox"
                                checked={value.includes(notice.noticeIdx)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setValue([...value, notice.noticeIdx]);
                                    } else {
                                        setValue(value.filter((v) => v !== notice.noticeIdx));
                                    }
                                }}
                            />
                                {/* <input type="checkbox" className={style.checkbox} value={notice.noticeIdx} checked={value.length === datas.length} onChange={(e) => onAllCheckBox(e.target.checked)} /> */}
                                {/* <div key={notice.noticeIdx}>
                <div>{notice.noticeIdx}</div> */}
                                {/* <Link to={`/notice/detail/${notice.noticeIdx}`}>{notice.title}</Link></div> */}
                                <Link to={`/notice/detail/${notice.noticeIdx}`}>
                                    <span className={style.title}>{notice.title}</span>
                                    <span className={style.writer}>{notice.userId}</span>
                                </Link>

                                <div>

                                </div>
                            </div>
                        ))
                    }


                    <div>
                        {/* let total = filteredDatas.length;
                            const numPages = Math.ceil(total / limit); */}
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
                                filteredDatas == "" && Array(Math.ceil(datas.length / limit)).fill().map((page, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setPage(i + 1)}
                                        aria-current={page === i + 1 ? "page" : null}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                            {
                                filteredDatas == "" && datas ?
                                    <button onClick={() => setPage(page + 1)} disabled={page == Math.ceil(datas.length / limit)}>
                                        &gt;
                                    </button>
                                    :
                                    <button onClick={() => setPage(page + 1)} disabled={page == Math.ceil(filteredDatas.length / limit)}>
                                        &gt;
                                    </button>
                            }

                            {/* {filteredDatas !=="" && 
                 
                    } */}
                        </nav>
                    </div>
                    {/* </div> */ }
                {/* 관리자 아이디일때만 버튼 보이도록 수정 필요*/}
                {/* <button className={style.writebutton}>작성</button> */}
                {/* <button className={style.delete}>삭제</button> */}
            {/* </div> */}
                {/* {
                    data.map((announcement) => {
                        return(
                        <div className={style.list}>
                        {/* <input type="checkbox" className={style.checkbox} /> */}
                        {/* className={style.title} */}
                        {/* <Link to={`/api/announcementDetail/${announcement.aidx}`} className={style.title}>{announcement.atitle}</Link>
                        <a className={style.writer}>{announcement.adate}</a> */}
                    {/* </div> */}
                        {/* )
                    })
                }  */}
        </div> 
        </>
            );
}


export default Notice;