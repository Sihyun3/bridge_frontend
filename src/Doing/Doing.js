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
    const [detailClick, setDetailClick] = useState([]);
    const [commentOpen, setCommentOpen] = useState([]);
    const [commentUpload, setCommentUpload] = useState([]);
    const [variable, setVariable] = useState(false);
    const [progress, setProgress] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [contentList, setContentList] = useState([
        {
            pcNumber: '',
            content: '',
            writer: '',
            pdNumber: '',
            date: '',
            file: '',
            img: ''
        }])
    const [listArray, setListArray] = useState([
        {
            receiver: '',
            photo: '',
            tag1: '',
            tag2: '',
            tag3: '',
            progress: ''
        }
    ]);
    const [payList, setPayList] = useState(
        {
            sender: '',
            receiver: '',
            money: '',
            date: '',
            img: ''
        }
    );
    const [commentList, setCommentList] = useState([{
        pdcNumber: '',
        writer: '',
        content: ''
    }])

    useEffect(() => {
        console.log(sessionStorage.token);
        if (sessionStorage.getItem('token') == null) {
            history.push('/login')
            return;
          }
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);

        let userId = decode_token.sub;
        setUserId1(userId);
        console.log(decode_token);
        console.log(userId);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/projectList/${decode_token.sub}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setListArray(response.data.map((data) => {
                    return ({
                        pdNumber: data.pdIdx,
                        receiver: data.userId2,
                        photo: data.profileImg,
                        tag1: data.userTag1,
                        tag2: data.userTag2,
                        tag3: data.userTag3,
                        progress: data.progress
                    })
                }))
            })
            .catch((error) => {
                console.log(error);
                console.log(userId)
                return;
            })

    }, []);



    const handlerClickSelect = (pdNumber, receiver, progress, tag1, tag2, tag3) => {

        setUserId2(receiver);
        const userId22 = receiver;
        console.log(userId1);
        console.log(userId2);
        setProgress(progress);
        tagList[0] = tag1;
        tagList[1] = tag2;
        tagList[2] = tag3;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/paylist/${userId1}/${userId22}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setPayList({
                    sender: response.data.userId1,
                    receiver: response.data.userId2,
                    money: response.data.plMoney,
                    date: response.data.plDate,
                    img: response.data.profileImg
                })
            }).catch((error) => {
                return;
            }
            )



        setPdIdx(pdNumber);
        console.log(pdIdx);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/${pdNumber}`
        )
            .then(response => {
                console.log(response);
                setContentList(response.data.map((data) => {
                    return ({
                        pcNumber: data.pcIdx,
                        content: data.pcContent,
                        writer: data.pcWriter,
                        pdNumber: data.pdIdx,
                        date: data.pcDate,
                        file: data.pcFile,
                        img: data.profileImg
                    });
                }));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
                    history.push('/login');
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
    // useEffect(() => {
    //     console.log("바뀐후 >>>>>>>>>>>>>>>>>>" + editClick);
    //     console.log('' == 0);
    // }, [editClick])


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
                console.log(response);
                setCommentList(response.data.map((data) => {
                    return ({
                        writer: data.userId,
                        content: data.pdcComment,
                        pdcNumber: data.pdcIdx
                    })
                })
                )
                console.log(commentList);

            }).catch((error) => {
                return;
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
        // console.log(listArray);

        return listArray && listArray.map((value, index) => {
            return (
                <>
                    <div key={index} className={style.partnerProfile}>
                        <button onClick={() => handlerClickSelect(value.pdNumber, value.receiver, value.progress, value.tag1, value.tag2, value.tag3)}>
                            <p className={style.img}> {value.photo}</p>
                            <div className={style.profileBox}>
                                <span className={style.nickname}>{value.receiver}</span>
                                <span className={style.tag}> {'#' + value.tag1} {'#' + value.tag2} {'#' + value.tag3}</span>
                            </div>
                        </button>
                    </div>
                    {/* {console.log(pdIdx)} */}

                    {/* <div className={style.doinglist} key={index}>
                        <button onClick={() => setPdIdx(handlerClickSelect(index + 1, value.receiver))}>
                            <div className={style.img}>{value.photo}</div>
                            <p className={style.p1}>{value.receiver} </p>
                            <p className={style.p2}>{value.tag1}</p>
                            <p className={style.p2}>{value.tag2}</p>
                            <p className={style.p2}>{value.tag3}</p>
                        </button>

                        {console.log(pdIdx)}
                    </div> */}
                </>
            );
        });
    };


    const ProjectPage = () => {

        return (
            <>

                <div className={style.payBox}>
                    <div className={style.payDate}> {payList.date} </div>
                    <div className={style.payList}>
                        <div className={style.img}>{payList.img}</div>
                        <div className={style.sender}>{payList.sender}</div>
                        <div className={style.money}>예치금 {payList.money}원이 결제되었습니다.</div>
                    </div>
                </div>
                {/* {console.log(contentList)} */}

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
                    <div className={style.doingTitle}> {userId2} </div>
                    <div className={style.doingProgress}>{progress == '0' ?
                        <>현재 작업이 <span style={{ fontWeight: 'bold' }}>진행 중</span>입니다. </>
                        :
                        <>완료된 작업입니다.</>}</div>
                    <div>
                        <div className={style.doingTag}>{'#' + tagList[0]} {'#' + tagList[1]} {'#' + tagList[2]}</div>
                        {ProjectPage()}
                        <button onClick={handlerClickUpload}>{uploadClick ? '업로드' : "업로드 취소"}</button> <br />
                        {/* {console.log(pdIdx)} */}
                        {uploadClick ? <></> : <Content pdIdx={pdIdx} uploadClick={uploadClick} setUploadClick={setUploadClick}
                            contentList={contentList} setContentList={setContentList} />}
                        <Complete pdIdx={pdIdx} setProgress={setProgress} />
                    </div>
                </div>
            </div>
        </>

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

    )
}

export default Doing;