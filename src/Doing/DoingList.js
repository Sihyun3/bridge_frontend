import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import style from '../Doing/DoingList.module.css'
import Swal from "sweetalert2";

const DoingList = () => {
    const [userList, setUserList] = useState([]);
    const [profileImg, setProfileImg] = useState([]);
    const [userId, setUserId] = useState('');
    const [progress, setProgress] = useState('');
    const history = useHistory();
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            alert('로그인이 필요합니다. 로그인해주세요');
            history.push('/login');
            return;
        }

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUserId(decode_token.sub);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getCommissionList/${decode_token.sub}`)
            .then((res) => {
                setUserList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const fetchProfileImages = async () => {
            const promises = userList.map((list) => {
                const userIdToFetch = userId !== list.userId2 ? list.userId2 : list.userId1;
                return axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/profile/${userIdToFetch}`);
            });

            try {
                const responses = await Promise.all(promises);
                const profileImages = responses.map((response) => response.data.profile);
                setProfileImg(profileImages);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfileImages();
    }, [userList, userId]);

    const handleListDel = (cIdx) => {
        console.log("+++++++++++++++++++++삭제버튼 눌림" )
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getProgress/${cIdx}`)
            .then((r) => {
                console.log("++++++++++프로그레스 받아옴")
                console.log("===========" + r.data[0].progress)
                if (r.data[0].progress == true) {
                    axios
                        .put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/delCommissionList/${cIdx}`)
                        .then((r) => {
                            console.log("목록에서 삭제");
                            // 삭제한 항목을 제외한 나머지 목록만 업데이트
                            const updatedList = userList.filter((user) => user.cidx !== cIdx);
                            setUserList(updatedList);
                        })
                        .catch((e) => {
                            console.log("cIdx>>>>>>>>>" + cIdx);
                        });
                } else if (r.data[0].progress == false) {
                    alert(`아직 작업이 진행중입니다.`);
                }
            })
            .catch((e) => {
                console.log("진행상황 에러" + e);
            });
    };

    return (
        <>
            <div className='container clearfix'>
                <div className={style.box1}>
                    <h1>작업 목록</h1>
                </div>
                <div className={style.list}>
                    <div className={style.profileimg}>
                        {profileImg.map((img, index) => {
                            return (
                                <img
                                    key={index}
                                    src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getImage/${img[0].profileImg}.jpg`}
                                />
                            );
                        })}
                    </div>
                    <div className={style.box2}>
                        {userList.map(userlist => (
                            <div key={userlist.cidx}>
                                <div className={style.userinfo}>
                                    {userId !== userlist.userId2 ? (
                                        <Link to={`/partner/doing/detail/${userlist.cidx}`}>
                                            <div>{userlist.userId2}</div>
                                        </Link>
                                    ) : (
                                        <Link to={`/partner/doing/detail/${userlist.cidx}`}>
                                            <div>{userlist.userId1}</div>
                                        </Link>
                                    )}
                                </div>
                                <div className={style.btn}>
                                    <button onClick={()=>handleListDel(userlist.cidx)}>목록삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoingList;