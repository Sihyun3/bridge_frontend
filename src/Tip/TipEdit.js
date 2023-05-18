import { useState, useEffect } from "react"
import axios from "axios";
import ToastEditor from "../Component/ToastEditor";
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

export default function TipEdit({ match }) {
    // const tb_idx = match.params.tbIdx;
    const tb_idx = 2;
    const [data, setData] = useState({});
    const [title, setTitle] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (sessionStorage.getItem('token') == null) {
            alert(`로그인이 필요합니다. 로그인해주세요`);
            history.push('/login')
            return;
          }
        const token = sessionStorage.getItem('token')
        const decode = jwtDecode(token);
        if (decode.sub != data.userId) {
            alert('작성자만 삭제 가능합니다.');
            history.push('/tip/list')
        }
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/tipdetail/${tb_idx}/0`)
            .then(r => {
                setData(r.data.tipDetail);
                console.log(r.data.tipDetail)
                setTitle(r.data.tipDetail.tbTitle);
            })
    }, [])

    return (

        <div className="container">
            <div><span>제목 : </span><input value={title} onChange={(e) => { setTitle(e.target.value) }} type='text'></input></div>
            {data.tbContents && <ToastEditor data={data} title={title}></ToastEditor>}
        </div>

    )
}