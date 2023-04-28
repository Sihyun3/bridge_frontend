import { useEffect, useState } from "react";
import axios from "axios";
import style from "../Doing/Content.module.css"

const ContentUpdate = ({ history, match }) => {
    // const {pdIdx} = match.params
    const pdIdx = 1;
    const pcIdx = 22;


    const [ContentList, setContentList] = useState([]);
    const [pcContent, setPcContent] = useState('');
    const [pcImg, setPcImg] = useState('');
    const [pdcComment, setPdcComment] = useState('');
    const [pcWriter, setPcWriter] = useState('');
    // const [pdIdx, setPdIdx] = useState('');
    const fd = new FormData();

    const MAX_FILE_SIZE = 50 * 1024 * 1024;

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
            url: `http://localhost:8080/api/bridge/partnerdetail/update/${pcIdx}`,
            headers: { 'Content-Type': 'multipart/form-data;' },
            data: formData
        }).then((response) => {
            console.log(response.data);

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
            <div className={style.contentbox}>
                <form onSubmit={handlerSubmit}>

                    <textarea className={style.write} type="text" value={pcContent} onChange={handlerChangePcContent} placeholder="글 내용을 입력해주세요" />

                    <input className={style.file} type="file" id="pcImg" name="a" multiple="multiple" onChange={handlerChangePcImg} placeholder="클릭시 파일을 등록합니다." />
                    {/* <input type="file"  name="profile_files"  multiple="multiple"/> */}
                    {/* <li>
                            댓글:{" "}
                            <input type="text" value={pdcComment} onChange={handlerChangePdcComment} />
                        </li> */}
                    {/* <li>
                            작성자:{" "}
                            <input type="text" value={pcWriter} onChange={handlerChangePcWriter} />
                        </li> */}

                    {/* <input type="button" className={style.finish} value="삭제" onClick={handlerClickDelete}/> */}
                    <input type="button" id="submit" className={style.delete} onClick={() => handlerClickDelete(pcContent, pcImg, pcWriter)} value="삭제" />
                    <button className={style.done} type="submit" onClick={handlerSubmit}>등록</button>
                </form>
            </div>
        </>
    )

}

export default ContentUpdate;