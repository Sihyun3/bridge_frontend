import style from './Doing.module.css'
import '../reset.css';
import Header1 from '../Header/Header1';
import img from "./checkbox.png"
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ProjectListPage from './ProjectListPage';
import Content from './Content';



const Doing = ({ history, match, pcIdx }) => {
    const a = 0;

    const [userId1, setUserId1] = useState('');
    const [userId2, setUserId2] = useState('');
    const [pdIdx, setPdIdx] = useState('');
    const [comment, setComment] = useState('');
    const [visible, setVisible] = useState([]);
    const [contentList, setContentList] = useState([
        {
            number: '',
            content: '',
            writer: ''
        }
    ]);
    const [listArray, setListArray] = useState([
        {
            receiver: '',
            photo: '',
            tag: ''
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

        axios.get(`http://localhost:8080/api/bridge/partnerDetail/projectList/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setListArray(response.data.map((data) => {
                    return ({
                        receiver: data.userId2,
                        photo: data.userPhoto,
                        tag: data.userTag
                    })
                }))
            })
            .catch((error) => {
                console.log(error);
                return;
            })


    }, []);



    const handlerClickSelect = (index, receiver) => {

        setUserId2(receiver);
        const userId22 = receiver;
        console.log(userId1);
        console.log(userId2);

        axios.get(`http://localhost:8080/api/bridge/partnerDetail/paylist/${userId1}/${userId22}`,
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

        setPdIdx(index);
        const pdIdx1 = index;
        console.log(pdIdx);
        axios.get(`http://localhost:8080/api/bridge/partnerdetail/${pdIdx1}`
        )
            .then(response => {
                console.log(response);
                setContentList(response.data.map((data) => {
                    return ({
                        number: data.pcIdx,
                        content: data.pcContent,
                        writer: data.pcWriter
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



    const handlerClickCommentWrite = () => {

        return (
            <>
                <input type="text" className={style.inputBox}></input>
            </>
        );
    }
    const ProjectList = () => {
        // console.log(listArray);

        return listArray && listArray.map((value, index) => {
            return (
                <>

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
        console.log(payList);
        console.log(contentList);

        const handlerClickComment = (pcIdx, index) => {

            visible[index] = !visible[index];

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
        const handleEditClick = (pcIdx) => {
            // history.push(`/21/${pcIdx}`);
            history.push(`/17/${pcIdx}`);
            // console.log(">>>>>>>>>>>>>>>>>>>");
        };
        return (
            <>
                <div className={style.contentsbox}>
                <div className={style.Doingbox}>
                    <p className={style.contents}>
                    {payList.sender}가 {payList.receiver}에게
                    {payList.money}를 {payList.date}에 주었습니다.
                    </p>
                    </div>
                </div>

                {contentList && contentList.map((value, index) => {
                    return (
                        <div className={style.contentsbox}>
                            <div className={style.Doingbox}>
                            <div className={style.img}>img{value.photo}</div>
                            <p className={style.name}>{value.writer}</p>
                            {/* {value.number} */}
                            <p className={style.contents}>{value.content}</p>
                           
                            <button className={style.button} key={value.number} onClick={() => handleEditClick(value.number)}>수정</button>
                            <button className={style.button} onClick={handlerClickCommentWrite}>코멘트</button>
                            <button className={style.button} onClick={() => handlerClickComment(value.number, index)}>{!visible[index] || visible[index] == null ? '펼치기' : '접기'}</button>
                            {visible[index] && CommentList()}
                        </div>
                        </div>
                    );
                })}

            </>
        );
    }


    const CommentList = () => {
        return commentList && commentList.map((data) => {
            return (
                <div>
                    <p className={style.commentsname}>{data.writer}</p>
                    <p className={style.commentscontents}>{data.content}</p>
                </div>
            );
        })
    }


    return (

        <>
            

                <div className={style.list}>
                    <h2>작업 목록</h2>
                    {ProjectList()}
                </div>
                <div className='container clearfix'>
                <div className={style.Doing}>
                <p className={style.teamname}>Team Name</p>
            <p className={style.isDoing}>현재 작업이 <b style={{ fontWeight: "bold" }}>진행 중</b> 입니다</p>
            <button className={style.upload}> 업로드 </button>
                    <div className={style.cbox}>
                        {ProjectPage()}
                        <Content />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Doing;