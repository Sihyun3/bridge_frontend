import style from './Chatting.module.css';
import user from './user.png';
import hand from './hand.png';
import send from './send.png';

const Chatting = () => {
    return (
        <>
                  <div className='container clearfix'>
            <div className={style.mainBox}>
                <div className={style.chatListBox}>
                    <div className={style.chatListText}>채팅 목록</div>
                    <hr className={style.hr}></hr>
                    <div className={style.chatListProfile}>
                        <div className={style.profile}>
                            <div className={style.profileImg}>
                                <img src={user} className={style.profileIcon}></img>
                            </div>
                            <div className={style.profileContent}>
                                <div className={style.profileName}>박보검</div>
                                <div className={style.shortChat}>안녕하세요 작곡의뢰 ..</div>
                            </div>
                        </div>
                        <div className={style.profile}>
                            <div className={style.profileImg}>
                                <img src={user} className={style.profileIcon}></img>
                            </div>
                            <div className={style.profileContent}>
                                <div className={style.profileName}>박보검</div>
                                <div className={style.shortChat}>안녕하세요 작곡의뢰 ..</div>
                            </div>
                        </div>

                        <div className={style.profile}>
                            <div className={style.profileImg}>
                                <img src={user} className={style.profileIcon}></img>
                            </div>
                            <div className={style.profileContent}>
                                <div className={style.profileName}>박보검</div>
                                <div className={style.shortChat}>안녕하세요 작곡의뢰 ..</div>
                            </div>
                        </div>
                        <div className={style.profile}>
                            <div className={style.profileImg}>
                                <img src={user} className={style.profileIcon}></img>
                            </div>
                            <div className={style.profileContent}>
                                <div className={style.profileName}>&nbsp;</div>
                                <div className={style.shortChat}>&nbsp;</div>
                            </div>
                        </div>

                        <div className={style.profile}>
                            <div className={style.profileImg}>
                                <img src={user} className={style.profileIcon}></img>
                            </div>
                            <div className={style.profileContent}>
                                <div className={style.profileName}>&nbsp;</div>
                                <div className={style.shortChat}>&nbsp;</div>
                            </div>
                        </div>

                        <div className={style.profile}>
                            <div className={style.profileImg}>
                                <img src={user} className={style.profileIcon}></img>
                            </div>
                            <div className={style.profileContent}>
                                <div className={style.profileName}>&nbsp;</div>
                                <div className={style.shortChat}>&nbsp;</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.chatBox}>
                    <div className={style.topText}>
                        <img src={user} className={style.chatProfile}></img>
                        <div className={style.chatName}>닉네임</div>
                    </div>
                    <hr className={style.chatHr}></hr>
                    <div className={style.chat}>
                        <div className={style.chatResponse}>
                            <div className={style.chatContent1}></div>
                            <div className={style.chatContent2}></div>
                            <div className={style.chatContent3}></div>
                        </div>
                        <div className={style.chatRequest}>
                            <div className={style.chatContent4}></div>
                            <div className={style.chatContent5}></div>
                            <div className={style.chatContent6}></div>
                        </div>
                        <div className={style.chatFoot}>
                        <button className={style.handButton}>
                        <img src={hand} className={style.handIcon}></img>
                        </button>
                        <input type="text" className={style.chatInput}></input>
                        <button className={style.sendButton}>
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