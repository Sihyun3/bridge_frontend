import style from './Doing.module.css'
import '../reset.css';
import Header1 from '../Header/Header1';
import img from "./checkbox.png"
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Content from './Content';
import ContentUpdate from './ContentUpdate';
import ContentDetail from './ContentDetail';
import CommentWrite from './CommentWrite';
import Complete from './Complete';



const Doing = ({ history, match, pcIdx }) => {

    const [userId1, setUserId1] = useState('');
    const [userId2, setUserId2] = useState('');
    const [pdIdx, setPdIdx] = useState('');
    const [uploadClick, setUploadClick] = useState(true);
    const [editClick, setEditClick] = useState('');
    const [isClick, setIsClick] = useState(false);
    const [isClick1, setIsClick1] = useState(false);
    const [commentUpload, setCommentUpload] = useState([]);
    const [variable, setVariable] = useState(false);
    const [progress, setProgress] = useState([]);

    const [tagList, setTagList] = useState([]);
    const [detailClick, setDetailClick] = useState([]);
    const [commentOpen, setCommentOpen] = useState([]);

    const [contentList, setContentList] = useState([]);
    const [list, setList] = useState([]);
    const [commentList,setCommentList] = useState([]);
    // const [contentList, setContentList] = useState([
    //     {
    //         pcNumber: '',
    //         content: '',
    //         writer: '',
    //         pdNumber: '',
    //         date: '',
    //         file: '',
    //         img: ''
    //     }])
    // const [listArray, setListArray] = useState([
    //     {
    //         receiver: '',
    //         photo: '',
    //         tag1: '',
    //         tag2: '',
    //         tag3: '',
    //         progress: ''
    //     }
    // ]);
    // const [payList, setPayList] = useState(
    //     {
    //         sender: '',
    //         receiver: '',
    //         money: '',
    //         date: '',
    //         img: ''
    //     }
    // );
    // const [commentList, setCommentList] = useState([{
    //     pdcNumber: '',
    //     writer: '',
    //     content: ''
    // }])

    //처음 렌더링이 될때 정보 가져오기
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        let userId = decode_token.sub;
        setUserId1(userId);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerDetail/projectList/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setList(response.data);
            })
            .catch((error) => {
                return;
            })

    }, []);

    const [temp, setTemp] = useState('');

    const handlerClickSelect = (props) => {
        console.log(props);
        // setUserId2(receiver);
        // const userId22 = receiver;
        // // console.log(userId1);
        // // console.log(userId2);
        // setProgress(progress);
        // tagList[0] = tag1;
        // tagList[1] = tag2;
        // tagList[2] = tag3;
        setPdIdx(props);
        setTemp(list.filter((data) => {
            return (data.pdIdx == props);
        }));
        console.log(list);

        console.log(list.filter((data) => {
            return (data.pdIdx == props);
        }));
        // setPdIdx(pdNumber);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/${props}`)
            .then(response => {
                console.log(response);
                setContentList(response.data);
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
                    history.push('/3');
                }
            });
    }

    const handlerClickUpload = () => {
        setUploadClick(!uploadClick);
    }

    const handlerEditClick = (index) => {
        console.log(index);
        // setIsClick(true);
        console.log("ccccccccccccccccccc")
        console.log(isClick);
        console.log(editClick);



        if (isClick == false) {

            console.log("bbbbbbbbbbbbbbbbbbbbbb")
            setIsClick(true);
            setEditClick(index);
            // setVariable(!variable);
            // editClick[index] = variable;
        }

        if (isClick == true) {
            if (editClick !== index) {
                alert("수정 중인 게시글이 있습니다.")
                return;
            }
            console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
            setIsClick(false);
            setEditClick('');
            // setVariable(!variable);
            // editClick[index] = variable
            return;
        }
    }


    const handlerDetailClick = (index) => {

        if (detailClick[index] == true) {
            detailClick[index] = false;
            setVariable(!variable)
        } else {
            detailClick[index] = true;
            setVariable(!variable)
        }
        console.log("detailClick[index] :" + detailClick[index])
    };


    const handlerClickComment = (pcIdx, index) => {

        if (commentOpen[index] == true) {
            commentOpen[index] = false;
            setVariable(!variable)
        } else {
            commentOpen[index] = true;
            setVariable(!variable)
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/comment/${pcIdx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response.data);
                setCommentList(response.data)
            }).catch((error) => {

            })

    }



    const handlerCommentUpload = (index) => {
        if (isClick1 == true) {
            if (commentUpload != index) {
                alert("작성 중인 댓글이 있습니다.")
                return
            }
            setIsClick1(false)
            setCommentUpload('');
        } else {
            setIsClick1(true);
            setCommentUpload(index);
        }
    }

    const handlerContentDelete = (pcIdx) => {

        // if (pcWriter != userId1) {
        //     alert('작성자만 삭제할 수 있습니다.');
        //     console.log(userId1);

        //     return;
        // }

        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/delete/${pcIdx}`)
            .then(response => {
                console.log(response);
                if (response.data === "Y") {
                    alert('정상적으로 삭제되었습니다.');
                } else {
                    alert('삭제에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    }

    const handlerCommentDelete = (pdcIdx) => {
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/comment/delete/${pdcIdx}`)
            .then(response => {
                if (response.data == 1) {
                    alert("정상적으로 삭제되었습니다.")
                } else {
                    alert("삭제에 실패했습니다.");
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert("삭제에 실패했습니다.");
                return;
            })
    }

    const ProjectList = () => {
        return list && list.map((value, index) => {
            console.log(value);
            return (
                <>
                    <div key={index} className={style.partnerProfile}>
                        <button onClick={() => handlerClickSelect(value.pdIdx)}>
                            <p className={style.img}> {value.photo}</p>
                            <div className={style.profileBox}>
                                <span className={style.nickname}>{value.userId2}</span>
                                <span className={style.tag}> {'#' + value.tag1} {'#' + value.tag2} {'#' + value.tag3}</span>
                            </div>
                        </button>
                    </div>

                </>
            );
        });
    }


    const ProjectPage = () => {
        console.log(temp);
        return (
            <>
                <div className={style.payBox}>
                    {/* <div className={style.payDate}> {list[pdIdx].} </div> */}
                    <div className={style.payList}>
                        <div className={style.img}>{temp[0].profileImg}</div>
                        <div className={style.sender}>{temp[0].userId2}</div>
                        <div className={style.money}>예치금 {temp[0].pdMoney}원이 결제되었습니다.</div>
                    </div>
                </div>
                {contentList && contentList.map((value, index) => {
                    return (
                        <div className={style.contentBox}>
                            <div className={style.contentDate}>{value.date}</div>
                            {/* 게시글 인덱스: {value.pcNumber} <br /> */}
                            <div className={style.content}>
                                <div className={style.img}>{value.img}</div>
                                <div className={style.writer}>{value.writer}</div>
                                <div className={style.main}>{value.content}</div>
                                <div className={style.file}>{value.file}</div>
                                <button key={value.pcNumber} onClick={() => handlerEditClick(index)}>{editClick === index ? "게시글 수정취소" : "게시글 수정"}</button>
                                {/* {console.log(editClick)} */}
                                {editClick === index ? <ContentUpdate pcIdx={value.pcNumber} setEditClick={setEditClick} setIsClick={setIsClick} /> : <></>}
                                {/* {console.log(detailClick[index])} */}
                                <button onClick={() => handlerDetailClick(index)} >{detailClick[index] == false || detailClick[index] == undefined ? "게시글 상세" : "게시글 접기"}</button>
                                {/* {console.log(detailClick)} */}
                                {detailClick[index] == true ? <ContentDetail pcIdx={value.pcNumber} /> : <></>}
                                <button onClick={() => handlerClickComment(value.pcNumber, index)}>{commentOpen[index] == false || commentOpen[index] == undefined ? '댓글펼치기' : '댓글접기'}</button>
                                {commentOpen[index] == true && CommentList()}
                                <button onClick={() => handlerCommentUpload(index)}>댓글 작성</button> {commentUpload === index ? <CommentWrite pcIdx={value.pcNumber} setCommentUpload={setCommentUpload} setIsClick1={setIsClick1} /> : <> </>}
                                <button onClick={() => handlerContentDelete(value.pcNumber)}> 게시글 삭제 </button>
                            </div>
                        </div>
                    )
                }

                )}

            </>
        )

    }




    const CommentList = () => {
        return commentList && commentList.map((data) => {
            console.log(data);
            return (
                <div>
                    {data.content != "" ? <p className={style.commentsname}>게시글 작성자: {data.writer}</p> : <p> 댓글이 없습니다. </p>}
                    {/* {console.log(">>>>>>>>>" + data.content)}
                    {console.log("========" + commentList)} */}
                    {data.content != "" && <p className={style.commentscontents}>게시글 내용: {data.content}</p>}
                    <button onClick={() => handlerCommentDelete(data.pdcNumber)}>댓글 삭제</button>
                    <br />
                    <br />
                    <br />
                </div>
            );
        })
    }


    return (
        <>

            <div className={style.MainBox}>
                <div className={style.list}>
                    <div className={style.listTitle}> 작업 목록 </div>
                    {ProjectList()}

                </div>
            </div>
            <div className='container clearfix' >
                <div className={style.doing}>
                    {
                        pdIdx != '' &&
                        <>
                            <div className={style.doingTitle}> {userId2} </div>
                            <div className={style.doingProgress}>{progress == '0' ?
                                <>현재 작업이 <span style={{ fontWeight: 'bold' }}>진행 중</span>입니다. </>
                                :
                                <>완료된 작업입니다.</>}</div>
                            <div>
                                <div className={style.doingTag}>{'#' + tagList[0]} {'#' + tagList[1]} {'#' + tagList[2]}</div>
                                {ProjectPage()}
                                <button onClick={handlerClickUpload}>{uploadClick ? '업로드' : "업로드 취소"}</button> <br />

                                {uploadClick ? <></> : <Content pdIdx={pdIdx} uploadClick={uploadClick} setUploadClick={setUploadClick}
                                    contentList={contentList} setContentList={setContentList} />}
                                <Complete pdIdx={pdIdx} setProgress={setProgress} />
                            </div>
                        </>
                    }

                </div>
            </div>
        </>



    )
}

export default Doing;


 // <>
    //     {/* <div>
    //     <h1> {list.userId}, {list.userId1}</h1>
    // </div> */}
    //     {/* <Header1 /> */}

    //     {/* <div>
    //         {console.log(listArray)}
    //     </div> */}
    //     <div className='box1'>
    //         <h1>게시판</h1>
    //     </div>
    //     <div className={style.list}>
    //         <h2>작업 목록</h2>
    //         <div>{ProjectList()}</div>
    //         {/* <div className={style.doinglist}>
    //             <img src={img} />
    //             <p>닉네임</p>
    //             <p>#악기태그</p>
    //         </div>
    //         <div className={style.doinglist}>
    //             <img src={img} />
    //             <p>닉네임</p>
    //             <p>#악기태그</p>
    //         </div> */}

    //     </div>
    //     <div className='container clearfix'>
    //         <div className={style.Doing} >
    //             <p className={style.teamname}>Team Name</p>
    //             <p className={style.isDoing}>현재 작업이 <b style={{ fontWeight: "bold" }}>진행 중</b> 입니다</p>
    //             <div className={style.upload}>업로드</div>
    //             {a == 0 &&
    //                 <div className={style.contentsbox}>
    //                     <p className={style.date}>2023년 4월 7일</p>
    //                     <div className={style.Doingbox}>
    //                         <img className={style.img} src={img} />
    //                         <div>{ProjectPage()}</div>
    //                         {/* <p className={style.contents}>예치금 10,000 원이 결제 되었습니다.</p>
    //                         <p className={style.name}>의뢰인</p>
    //                         <p className={style.contents}>ㄴㅁㅇㄴ</p> */}
    //                         <li className={style.clearfix} >
    //                             <ul className={style.button}>코멘트</ul>
    //                             <ul className={style.button}>펼치기</ul>
    //                         </li>
    //                     </div>
    //                 </div>
    //             }
    //             {a != 1 &&
    //                 <>
    //                     <div className={style.contentsbox} style={{ marginBottom: '15px' }}>
    //                         <p className={style.date}>2023년 4월 7일</p>
    //                         <div className={style.Doingbox}>
    //                             <img className={style.img} src={img} />
    //                             <p>{CommentList()}</p>
    //                             {/* <p className={style.name}>의뢰인</p> */}
    //                             {/* <p className={style.contents}>예치금 10,000 원이 결제 되었습니다.</p> */}
    //                             <li className={style.clearfix} >
    //                                 <ul className={style.button}><button onClick={handlerClickCommentWrite}>코멘트</button></ul>
    //                                 <ul className={style.button}><button onClick={() => handlerClickComment()}>{visible ? '펼치기' : '접기'}</button></ul>
    //                             </li>
    //                         </div>
    //                     </div>
    //                     <div className={style.commentsbox}>
    //                         <img className={style.commentsimg1} src={img} />
    //                         <img className={style.commentsimg} src={img} />
    //                         <p className={style.commentsname}>의뢰인</p>
    //                         <p className={style.commentscontents}>예치금 10,000 원이 결제 되었습니다.</p>
    //                         <li className={style.commentsclearfix} >
    //                             <ul className={style.commentsbutton}>답장</ul>
    //                             <ul className={style.commentsbutton}>펼치기</ul>
    //                         </li>
    //                     </div>
    //                     <div className={style.commentsbox}>
    //                         <img className={style.commentsimg1} src={img} />
    //                         <img className={style.commentsimg} src={img} />
    //                         <p className={style.commentsname}>의뢰인</p>
    //                         <p className={style.commentscontents}>예치금 10,000 원이 결제 되었습니다.</p>
    //                         <li className={style.commentsclearfix} >
    //                             <ul className={style.commentsbutton}>답장</ul>
    //                             <ul className={style.commentsbutton}>펼치기</ul>
    //                         </li>
    //                     </div>

    //                 </>
    //             }

    //         </div>
    //     </div>
    // </>