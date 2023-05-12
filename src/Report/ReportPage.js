import style from './ReportPage.module.css';
import '../reset.css'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ReportPage() {

    const [select, setSelect] = useState('');
    const [reportReasonDetail, setReportReasonDetail] = useState('')
    const [reportedUserId, setReportedUserId] = useState('');
    const [userId, setUserId] = useState('');

    const history = useHistory();

    //신고사유 선택
    const handleSelect = (e) => {
        setSelect(e.target.value);
    };

    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        console.log("222222222" + decode_token);
        setUserId(decode_token.sub);
        //신고당하는사람 하드코딩 => 나중에 get 해오기 => 수정 필요 !!! 
        setReportedUserId("tester");
    })

    //신고 제출 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/report/${reportedUserId}`, { userId, reportedUserId, reportReasonDetail ,"reportReason":select})
            .then(response => {
                console.log(response);
                alert('정상적으로 신고되었습니다');
                // 어디로 보낼지 고민
                history.push(`/`)
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDetail = (e) => {
        setReportReasonDetail(e.target.value);
    }

    return (
        <div className="container">
            <div className={style.Box}>
                {/* <label for="target">신고대상</label> */}
                {/* value={reportedUserId} */}
                <div id="target" className={style.Target}>신고대상: {reportedUserId}</div>
                <select className={style.Select} onChange={handleSelect} value={select}>
                    <option value="" disabled selected>신고 사유 선택</option>
                    <option value="스팸/홍보성 글" >스팸/홍보성 글</option>
                    <option value="욕설/비방 글" >욕설/비방 글</option>
                    <option value="결제 관련" >결제 관련</option>
                    <option value="기타" >기타</option>
                </select>
                <div className={style.input}><textarea className={style.inner} type="text" value={reportReasonDetail} onChange={handleDetail}></textarea></div>
                <button className={style.button} onClick={handleSubmit}>신고</button>

            </div>
        </div>
    )
}
export default ReportPage;