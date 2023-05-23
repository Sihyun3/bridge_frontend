import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';

const DoingList = () => {

    const [userList, setUserList] = useState([]);
    const [profileImg, setProfileImg] = useState([]);
    const [userId, setUserId] = useState('');
    const history = useHistory();

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
            .then(res => {
                setUserList(res.data);
                console.log(">>>>>>>>>>" + res.data);
                userList.map(list=>{
                    return(
                    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/profile/${userList.userId2}`)
                    )
                })
                
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleListDel = cIdx => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/delCommissionList/${cIdx}`)
            .then(r => {
                console.log("목록에서 삭제");
                axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getCommissionList/${userId}`)
                    .then(res => {
                        setUserList(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(e => { console.log("cIdx>>>>>>>>>" + cIdx) })
    }

    return (
        <>
            <div>
                <hr />
                <h3>작업 목록</h3>
                <hr />
                <br />

                {
                    userList.map(userlist => {
                        return (
                            <>
                                {/* {console.log(">>>>>>>>>>>" + userlist.cidx)} */}
                                <div>
                                    <Link to={`/partner/doing/detail/${userlist.cidx}`}><div>{userlist.userId2}</div></Link>
                                    <br/>
                                    <button onClick={() => handleListDel(userlist.cidx)}>목록삭제</button>
                                    <hr />
                                </div>
                            </>
                        )
                    })
                }


            </div>
        </>
    );
}

export default DoingList;