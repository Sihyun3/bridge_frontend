import { useEffect, useState } from "react";
import axios from "axios";
import style from "../Doing/Content.module.css"

const ContentUpdate = () => {
    // const { pcIdx } = match.params;
    // const { pdIdx } = match.params;
    const pcIdx = 1;
    const pdIdx = 2; 
    

    const [ContentList, setContentList] = useState({
        content : '',
        date : '',
        file : '',
        writer:''
    });
    const [pcContent, setPcContent] = useState('');
    const [pcImg, setPcImg] = useState('');
    const [pdcComment, setPdcComment] = useState('');
    const [pcWriter, setPcWriter] = useState('');
    // const [pdIdx, setPdIdx] = useState('');
    const [test, setTest] = useState(0);

    const fd = new FormData();

    const MAX_FILE_SIZE = 50 * 1024 * 1024;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bridge/partnerdetail/content/${pcIdx}`)
            .then(response => {
                console.log(response);
                // console.log(pcIdx);
                // console.log(response.data);
                setContentList({
                    content : response.data.pcContent.pcContent,
                    date : response.data.pcContent.pcDate,
                    file : response.data.pcContent.pcFile,
                    writer : response.data.pcContent.pcWriter
                })
                setTest(response.data.pcContent.pcIdx);
                console.log("111111111" + test);
                // const token = sessionStorage.getItem('token');
                // console.log("111111111" + token);
                // const decode_token = jwt_decode(token);
                // console.log("222222222" + decode_token);
                // setWriter(decode_token.sub);
            }
            )
            .catch(error => console.log(error));
    }, []);

    const handlerChangePcImg = e => {
        if (!e.target.files[0]) {
            alert("업로드 불가능한 파일 형식입니다.");
            return;
        } else if (e.target.files[0].size > MAX_FILE_SIZE) {
            alert("파일 크기는 50MB를 초과할 수 없습니다.");
            return;
        }
        setPcImg(e.target.files);
    };

    const handlerChangePcContent = e => setPcContent(e.target.value);
    const handlerChangePdcComment = e => setPdcComment(e.target.value);
    const handlerChangePcWriter = (e) => setPcWriter(e.target.value);



    const handlerSubmit = (e) => {
        e.preventDefault();
        let files = pcImg;
        let formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("Data", new Blob([JSON.stringify({ pcContent, pcWriter, pdIdx })], { type: "application/json" }))
        // formData.append("Data", {PartnerContentDto:{pcContent,pcWriter}})
        console.log(formData)

        axios({
            method: 'PUT',
            url: `http://localhost:8080/api/bridge/partnerdetail/update/${test}`,
            headers: { 'Content-Type': 'multipart/form-data;' },
            data: formData
        }).then((response) => {
            console.log(">>>>>>>>>>>" + response.data.pcContent);
            console.log("=========" + response.data);
            setPcContent(pcContent);
            setPcImg(pcImg);
            console.log("333333333333" + pcImg);


            alert("업로드가 성공했습니다.")
        }).catch(() => {
            alert("업로드 중 오류가 발생했습니다.");
        });
    }
    const handlerClickDelete = (pcContent, pcImg, pcWriter) => {
        // if (pcWriter != userNickname) {
        //     alert('작성자만 삭제할 수 있습니다.');
        //     console.log(userNickname);

        //     return;
        // }
        axios.put(`http://localhost:8080/api/bridge/partnerdetail/delete/${pcIdx}`)
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
                            {console.log(ContentList)}
                            
                            {ContentList.writer}

                            <textarea className={style.write} type="text" value={pcContent} onChange={handlerChangePcContent} placeholder={ContentList.content}>
                                {ContentList.content}
                            </textarea>

                            <input className={style.file} type="file" id="pcImg"  name="a" multiple="multiple" onChange={handlerChangePcImg} placeholder="클릭시 파일을 등록합니다." />
                            <input type="button" id="submit" className={style.delete} onClick={() => handlerClickDelete(pcContent, pcImg, pcWriter)} value="삭제" />
                            <button className={style.done} type="submit" onClick={handlerSubmit}>등록</button>
                        </form>
                    </div>
                {/* ) */}
                {/* )} */}
        </>

    )
}



export default ContentUpdate;