import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ReportList = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/openReportList`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <>
            {
                data.map((reportList) => {
                    return (
                        <>
                            <div >
                            <Link to={`/7/${reportList.reportIdx}`}> 신고 번호 : {reportList.reportIdx} </Link>
                                <span>
                                신고 사유 : {reportList.reportReason}
                                </span>
                                <span>
                                신고자 : {reportList.userId}
                                </span>
                                <span>
                                신고대상 : {reportList.reportedUserId}
                                </span>
                            </div>
                            <hr />
                        </>
                    )
                })
            }
        </>
    )
}

export default ReportList;