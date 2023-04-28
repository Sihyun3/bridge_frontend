import { useEffect, useState } from "react";
import axios from "axios";

function Content ({pdIdx}) {
    const [ContentList, setContentList] = useState([]);

useEffect(() => {
    axios.get(`http://localhost:8080/api/bridge/partnerdetail/${pdIdx}`)
        .then(response => {
            console.log(response);
            setContentList(response.data);
        })
        .catch(error => console.log(error));

}, []);
}

export default Content;