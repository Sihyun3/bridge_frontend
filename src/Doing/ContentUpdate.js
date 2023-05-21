import { useEffect, useState } from "react";
import axios from "axios";
import style from "../Doing/Content.module.css"
import jwt_decode from "jwt-decode";

const ContentUpdate = ({ pcIdx, setEditClick, setIsClick, index1, pdNumber1, handlerClickSelect }) => {

    const [ContentList, setContentList] = useState({
        content: '',
        date: '',
        file: '',
        writer: ''
    });
    const [pcContent, setPcContent] = useState('');
    const [pcFile, setPcFile] = useState('');
    const [pdcComment, setPdcComment] = useState('');
    const [pcWriter, setPcWriter] = useState('');
    const [test, setTest] = useState(0);

    const fd = new FormData();

    const MAX_FILE_SIZE = 50 * 1024 * 1024;

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/content/${pcIdx}`)
            .then(response => {
                console.log(response);
                setContentList({
                    content: response.data.pcContent,
                    date: response.data.pcDate,
                    file: response.data.pcFile,
                    writer: response.data.pcWriter
                })
                setTest(response.data.pcContent.pcIdx);
            }
            )
            .catch(error => console.log(error));
    }, []);

    const handlerChangePcFile = e => {
        if (!e.target.files[0]) {
            alert("업로드 불가능한 파일 형식입니다.");
            return;
        } else if (e.target.files[0].size > MAX_FILE_SIZE) {
            alert("파일 크기는 50MB를 초과할 수 없습니다.");
            return;
        }
        setPcFile(ContentList.file);
        setPcFile(e.target.files);
    };

    const handlerChangePcContent = e => setPcContent(e.target.value);
    const handlerChangePdcComment = e => setPdcComment(e.target.value);
    const handlerChangePcWriter = (e) => setPcWriter(e.target.value);


    const handlerSubmit = (e) => {
        e.preventDefault();
        let files = pcFile;
        let formData = new FormData();

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        let tempPcWriter = decode_token.name;

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("Data", new Blob([JSON.stringify({ pcContent, tempPcWriter, pcIdx })], { type: "application/json" }))

        // /* key 확인하기 */
        // for (let key of formData.keys()) {
        //     console.log(key);
        // }

        // /* value 확인하기 */
        // for (let value of formData.values()) {
        //     console.log(value);
        // }

        console.log(pcIdx);

        axios({
            method: 'PUT',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/update/${pcIdx}`,
            headers: { 'Content-Type': 'multipart/form-data;' },
            data: formData
        })
            .then((response) => {
                console.log(response);
                if (response.data.count == 0) {
                    alert("수정된 내용이 없습니다.");
                } else {
                    alert("수정되었습니다.");
                    setEditClick(false)
                    setIsClick(false);
                    handlerClickSelect(index1, pdNumber1);
                }
            })
            .catch((error) => {
                alert("업로드 중 오류가 발생했습니다.");
            });
    }
    const handlerClickDelete = (pcContent, pcImg, pcWriter) => {
        // if (pcWriter != userNickname) {
        //     alert('작성자만 삭제할 수 있습니다.');
        //     console.log(userNickname);

        //     return;
        // }
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/bridge/partnerdetail/delete/${pcIdx}`)
            .then(response => {
                console.log(response);
                if (response.data === "Y") {
                    alert('정상적으로 삭제되었습니다.');
                    window.location.replace(`/17`);
                } else {
                    alert('삭제에 실패했습니다.');
                    return;
                }
            })
            .catch(error => {
                console.log(error);
                alert(`삭제에 실패했습니다. (${error.message})`);
                return;
            });
    };


    return (
        <>
            {/* {
                ContentList.map(ContentList => ( */}
            <div className={style.contentbox}>

                <form onSubmit={handlerSubmit}>
                    {/* {ContentList.writer} */}
                    <textarea className={style.write} type="text" value={pcContent} onChange={handlerChangePcContent} placeholder={ContentList.content}>
                        {/* {ContentList.content} */}
                    </textarea>
                    {console.log(ContentList.file)}
                    <input className={style.file} type="file" id="pcFile" name="a" multiple="multiple" onChange={handlerChangePcFile} placeholder={ContentList.file} />
                
                    {/* <button className={style.delete} onClick={() => handlerClickDelete(pcContent, pcFile, pcWriter)} value="삭제"> 삭제 </button> */}
                    <button className={style.done} type="submit">등록</button>
                </form>
            </div>
            {/* ) */}
            {/* )} */}
        </>

    )
}



export default ContentUpdate;