import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from '../Admin-Report/ReportList.module.css'


const ReportList = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/openReportList`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <> 
        <div className={style.box1}>
            <h1>신고 관리</h1>
        </div>
            <div className='container clearfix'>
                <div className={style.reportbox}>

                    <ul className={style.info}>
                        <li>신고 번호</li>
                        <li>신고 사유</li>
                        <li>신고자</li>
                        <li>신고 대상</li>
                    </ul>

                    {
                        data.map((reportList) => {
                            return (
                                <>

                                    <div className={style.list}>
                                        <Link to={`/7/${reportList.reportIdx}`} className={style.num}> {reportList.reportIdx} </Link>
                                        <span>
                                            {reportList.reportReason}
                                        </span>
                                        <span>
                                            {reportList.userId}
                                        </span>
                                        <span>
                                            {reportList.reportedUserId}
                                        </span>
                                    </div>


                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ReportList;