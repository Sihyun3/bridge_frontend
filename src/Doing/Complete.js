import axios from "axios";
import { useEffect } from "react";

const Complete = ({ pdIdx,setProgress }) => {

    const handlerProjectComplete = () => {

        const result = window.confirm("정말 완료하셨나요?")

        if (result) {
            axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/complete/${pdIdx}`)
                .then(response => {
                    console.log(response);
                    alert("결제가 진행되었습니다.");
                    setProgress(true);
                })
                .catch(error => {
                    console.log(error);
                    return;
                })
        } 
}



return (
    <>
        <button onClick={handlerProjectComplete}> 결제 진행 </button>
    </>
);
}

export default Complete;