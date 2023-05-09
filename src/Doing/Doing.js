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

import ProjectListPage from './ProjectListPage';




const Doing = ({ history, match, pcIdx }) => {
    const a = 0;

    const [userId1, setUserId1] = useState('');
    const [userId2, setUserId2] = useState('');
    const [pdIdx, setPdIdx] = useState('');
    const [comment, setComment] = useState('');
    const [visible, setVisible] = useState([]);
    const [uploadClick, setUploadClick] = useState(true);
    const [editClick, setEditClick] = useState('');
    let [isClick, setIsClick] = useState(false);
    const [detailClick, setDetailClick] = useState([]);
    const [variable, setVariable] = useState(true);
    const [contentList, setContentList] = useState([
        {
            pcNumber: '',
            content: '',
            writer: '',
            pdNumber: ''
        }])
    const [listArray, setListArray] = useState([
        {
            receiver: '',
            photo: '',
            tag1: '',
            tag2: '',
            tag3: ''
        }
    ]);
    const [payList, setPayList] = useState(
        {
            sender: '',
            receiver: '',
            money: '',
            date: '',
        }
    );
    const [commentList, setCommentList] = useState([{
        writer: '',
        content: ''
    }])

    useEffect(() => {
        console.log(sessionStorage.token);

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);

        let userId = decode_token.name;
        setUserId1(userId);
        console.log(decode_token);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerDetail/projectList/${userId}`,
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
                        tag3: data.userTag3
                    })
                }))
            })
            .catch((error) => {
                console.log(error);
                return;
            })


    }, []);



    const handlerClickSelect = (pdNumber, receiver) => {

        setUserId2(receiver);
        const userId22 = receiver;
        console.log(userId1);
        console.log(userId2);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerDetail/paylist/${userId1}/${userId22}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setPayList({
                    sender: response.data.userId1,
                    receiver: response.data.userId2,
                    money: response.data.plMoney,
                    date: response.data.plDate
                })
            }).catch((error) => {
                return;
            }
            )

        setPdIdx(pdNumber);
        const partnerDetailIdx = pdNumber;
        console.log(pdIdx);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/${pdIdx}`
        )
            .then(response => {
                console.log(response);
                setContentList(response.data.map((data) => {
                    return ({
                        pcNumber: data.pcIdx,
                        content: data.pcContent,
                        writer: data.pcWriter,
                        pdNumber: data.pdIdx
                    });
                }));
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
                    history.push('/3');
                }
            });
        // console.log(index);
        // return (index);
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
     
        

        if(isClick == false){
     
            console.log("bbbbbbbbbbbbbbbbbbbbbb")
            setIsClick(true);
            setEditClick(index);
            // setVariable(!variable);
            // editClick[index] = variable;
        }

        if (isClick == true) {
            if(editClick !== index){
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
    useEffect(()=>{
        console.log("바뀐후 >>>>>>>>>>>>>>>>>>" +editClick);
        console.log('' == 0);
    },[editClick])

    const handlerDetailClick = (index) => {
        setVariable(!variable)
        detailClick[index] = variable
    };


    const handlerClickComment = (pcIdx, index) => {

        setVariable(!variable);
        visible[index] = variable;

        axios.get(`http://localhost:8080/api/bridge/partnerDetail/comment/${pcIdx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setCommentList(response.data.map((data) => {
                    return ({
                        writer: data.userId,
                        content: data.pdcComment
                    })
                })
                )
                console.log(commentList);

            }).catch((error) => {
                return;
            })

    }

    const ProjectList = () => {
        // console.log(listArray);

        return listArray && listArray.map((value, index) => {
            return (
                <>
                    <div key={index}>
                        <button onClick={() => handlerClickSelect(value.pdNumber, value.receiver)}>
                            상대 닉네임 : {value.receiver} <br />
                            상대 프로필이미지 : {value.photo} <br />
                            상대 악기태그: {value.tag1} {value.tag2} {value.tag3} <br /> <br />
                        </button>
                    </div>
                    {/* {console.log(pdIdx)} */}

                    <div className={style.doinglist} key={index}>
                        <button onClick={() => setPdIdx(handlerClickSelect(index + 1, value.receiver))}>
                            <div className={style.img}>{value.photo}</div>
                            <p className={style.p1}>{value.receiver} </p>
                            <p className={style.p2}>{value.tag}</p>
                        </button>

                        {console.log(pdIdx)}
                    </div>
                </>
            );
        });
    };


    const ProjectPage = () => {
        // console.log(payList);
        // console.log(contentList);

        const handlerClickComment = (pcIdx, index) => {

            visible[index] = !visible[index];

            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerDetail/comment/${pcIdx}`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then((response) => {
                    console.log(response);
                    setCommentList(response.data.map((data) => {
                        return ({
                            writer: data.userId,
                            content: data.pdcComment
                        })
                    })
                    )
                    console.log(commentList);

                }).catch((error) => {
                    return;
                })

        }
        const handleEditClick = (pcIdx) => {
            // history.push(`/21/${pcIdx}`);
            history.push(`/17/${pcIdx}`);
            // console.log(">>>>>>>>>>>>>>>>>>>");
        };
        return (
            <>
                <div>
                    {payList.sender}가 {payList.receiver}에게
                    {payList.money}를 {payList.date}에 주었습니다.
                    <br />
                    <br />
                    <br />
                </div>
                {/* {console.log(contentList)} */}

                {contentList && contentList.map((value, index) => {
                    return (
                        <div>
                            게시글 인덱스: {value.pcNumber} <br />
                            게시글 내용: {value.content} <br />
                            게시글 작성자: {value.writer} <br />
                            <button key={value.pcNumber} onClick={() => handlerEditClick(index)}>{editClick === index?   "수정취소" : "수정"}</button>
                            {/* {console.log(editClick)} */}
                            
                            {editClick === index ? <ContentUpdate pcIdx={value.pcNumber} index={index} editClick={editClick} setEditClick={setEditClick} setVariable={setVariable} variable={variable} /> : <></>}
     

                            <button onClick={() => handlerDetailClick(index)} >{!detailClick[index] ? "상세" : "접기"}</button>
                            {/* {console.log(detailClick)} */}
                            {detailClick[index] ? <ContentDetail pcIdx={value.pcNumber} /> : <></>}
                            <button onClick={() => handlerClickComment(value.pcNumber, index)}>{!visible[index] || visible[index] == null ? '펼치기' : '접기'}</button><br /><br />
                            {visible[index] && CommentList()}
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
                    <p className={style.commentsname}>게시글 작성자: {data.writer}</p>
                    <p className={style.commentscontents}>게시글 내용: {data.content}</p>
                </div>
            );
        })
    }


    return (

        <>
            <div className={style.list}>{ProjectList()}</div>
            <div className={style.Doing}>
                <div>
                    {ProjectPage()}
                    {/* hanlerClickUpload () -> 함수를 호출. 밑 구문을 읽을 때 Click이 되지 않아도 바로 함수 호출.
                                    함수가 호출되면서 상태변수가 바뀌니깐 return문이 rerendering. 그래서 무한루프
                    handlerClickUpload -> 함수 정의를 전달. 즉 Click했을 때만 실행 */}
                    <button onClick={handlerClickUpload}>{uploadClick ? '업로드' : <></>}</button>
                    {/* {console.log(pdIdx)} */}
                    {uploadClick ? <></> : <Content pdIdx={pdIdx} uploadClick={uploadClick} setUploadClick={setUploadClick}
                        contentList={contentList} setContentList={setContentList} />}
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