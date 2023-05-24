import style from './Chatting.module.css';
import user from './user.png';
import hand from './hand.png';
import send from './send.png';
import { useRef, useState, useEffect, useCallback } from 'react';
import * as StompJs from '@stomp/stompjs';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Doing from '../Doing/Doing';
import Swal from "sweetalert2";


const Chatting = ({ match }) => {

    const client = useRef({});
    const [chatList, setChatList] = useState([]);
    const [sender, setSender] = useState('');
    const [message, setMessage] = useState([]);
    const [chat, setChat] = useState('');
    const [roomIdx, setRoomIdx] = useState('');
    const [reciver, setReciver] = useState('');

    const history = useHistory();

    const publish = () => {
        if (!client.current.connected) return;
        client.current.publish({
            destination: '/pub/hello',
            body: JSON.stringify({
                roomIdx: roomIdx,
                data: chat,
                writer: sender
            }),
        });
        setChat('');
    };

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            Swal.fire({
                icon: 'error',
                title: '로그인이 필요합니다.',
                text: '로그인 페이지로 이동합니다.',
            })
            history.push('/login')
            return;
        }
        connect();
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/chatroom`, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(r => {
                setChatList(r.data.chatting)
                setSender(r.data.sender)
            })
    }, [])

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: `ws://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/ws`,
            onConnect: () => {
                console.log('success');
            },
        });
        client.current.activate();
    };

    const chatroom = (props) => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/chat/${props}`)
            .then(response => {
                setMessage(response.data.messagelist);
                setRoomIdx(response.data.chatting.roomIdx)
                subscribe(response.data.chatting.roomIdx);
                if (sender == response.data.chatting.userId1) {
                    setReciver(response.data.chatting.userId2)
                } else if (sender == response.data.chatting.userId2) {
                    setReciver(response.data.chatting.userId1)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    function subscribe(roomIdx) {
        client.current.subscribe('/sub/channel/' + roomIdx, recive)
    }

    const recive = useCallback((body) => {
        const json_body = JSON.parse(body.body);
        setMessage((message) =>
            [...message, { roomIdx: json_body.roomIdx, data: json_body.data, writer: json_body.writer }]
        );
    })

    const handleHand = () => {
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertCommission/${reciver}`, { "userId1": sender })
            .then(r => {
                history.push(`/partner/doing`)
            })
            .catch(e => { console.log(e) })
    }

    return (
        <>
            <div className='container clearfix'>
                <div className={style.mainBox}>
                    <div className={style.chatListBox}>
                        <div className={style.chatListText}>채팅 목록</div>
                        <hr className={style.hr}></hr>
                        <div className={style.chatListProfile}>
                            {chatList.map((list) => {
                                var reciver;
                                if (list.userId1 == sender) {
                                    reciver = list.userId2;
                                } else if (list.userId2 == sender) {
                                    reciver = list.userId1
                                }
                                return (
                                    <div className={style.profile} onClick={() => chatroom(list.roomIdx)}>
                                        <div className={style.profileImg}>
                                            <img src={user} className={style.profileIcon}></img>
                                        </div>
                                        <div className={style.profileContent}>

                                            <div className={style.profileName}>{reciver}</div>

                                            <div className={style.shortChat}>안녕하세요 작곡의뢰 ..</div>
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className={style.chatBox}>
                        <div className={style.topText}>
                            <img src={user} className={style.chatProfile}></img>
                            <div className={style.chatName}>{reciver}</div>
                        </div>
                        <hr className={style.chatHr}></hr>
                        <div className={style.chat}>
                            <div className={style.chatbox}>
                                {
                                    message.map(d => {
                                        if (d.writer == sender) {
                                            return (<div className={style.chatContent1}><p>{d.data}</p></div>)
                                        } else if (d.writer != null && d.writer != sender) {
                                            return (<div className={style.chatContent4}><p>{d.data}</p></div>)
                                        }
                                    })
                                }
                            </div>
                            <div className={style.chatFoot}>
                                <button onClick={handleHand} className={style.handButton}>
                                    <img src={hand} className={style.handIcon}></img>
                                </button>
                                <input type="text" onChange={(e) => { setChat(e.target.value) }} value={chat} className={style.chatInput}></input>
                                <button className={style.sendButton} onClick={publish}>
                                    <img src={send} className={style.sendIcon}></img>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatting;