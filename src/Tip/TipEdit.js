import { useState, useEffect } from "react"
import axios from "axios";
import ToastEditor from "../Component/ToastEditor";
export default function TipEdit({ match }) {
    // const tb_idx = match.params.tbIdx;
    const tb_idx = 2;
    const [data, setData] = useState({});
    const [title, setTitle] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/tipdetail/${tb_idx}/0`)
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