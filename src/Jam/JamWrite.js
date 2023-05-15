import style from "./JamWrite.module.css";
import JamBack from "./Rectangle 49.png";
import JamIcon from "./Polygon 2.png";
import musicfile from './musical-note.png';
import axios from "axios";
import { useState, useRef } from "react";
const JamWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState("");
    // const photoRef = useRef;
    const [photo, setPhoto] = useState("");
    const [music, setMusic] = useState("");
    const [instrument, setInstrument] = useState("");
    const handlersubmit = () => {
        sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInN1YiI6InRlc3QiLCJqdGkiOiJkMjE3ZmQ0Ny1kYWUwLTQ0OGEtOTQwNy1mYWE1NjY2OTQ3NWIiLCJpYXQiOjE2ODI1ODY1MjgsImV4cCI6ODY0MDE2ODI1ODY1Mjh9.nEvZzgu8d0J4yfTaQ1Ea3oPUL-LQBH7aIv-JVxgF78o");
        let formData = new FormData();

        // let datas = {"cTitle" : title, "cContents": content}
        let datas = { "title": title, "content": content };
        formData.append("data", new Blob([JSON.stringify(datas)], { type: "application/json" }))
        for (let i = 0; i < photo.length; i++) {
            formData.append("files", photo[i]);
        }

        let formData1 = new FormData();
        let data = { "cmInstrument": instrument }
        formData1.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }))
        for (let i = 0; i < music.length; i++) {
            formData1.append("files", music[i]);
        }

        axios({
            method: 'POST',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertjam`,
            headers: { 'Content-Type': 'multipart/form-data;', 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
            data: formData
        }).then((r) => {
            console.log("aaaaaaaaaaaaaaaaaaaa");
            console.log(r.data)
            axios({
                method: 'POST',
                url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertmusic/${r.data}`,
                headers: { 'Content-Type': 'multipart/form-data;', 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
                data: formData1
            })
        }).catch(() => {
            alert(`업로드 중 오류가 발생했습니다.`);
        });

    }

    return (
        <>
            <div className='container clearfix' >
                <div>
                    <div className={style.title1}>
                        <p className={style.titleName}>Jam</p>
                    </div>
                    
                    <div className={style.box}>
                        <div className={style.titleBox}>
                            {/* <label for="title2" className={style.title2}> 제목 </label> */}
                            <textarea id="title2" values={title} onChange={(e) => { setTitle(e.target.value) }} className={style.titleInput} placeholder="제목을 입력해주세요." />
                        </div>
                        <label for="introduce" className={style.introduce}>소개글</label>
                        <div className={style.introduceBox}>
                            <textarea  id="introduce" values={content} onChange={(e) => { setContent(e.target.value) }} className={style.introduceInput} placeholder="코드진행 등 이 잼에 대해 알려주세요~♪" />
                        </div>
                        <label for="photo" className={style.photo}>사진</label>
                        <div className={style.photoBox}>
                            <input type="file" id="photo" placeholder="사진을 첨부해주세요" multiple="multiple" onChange={(e) => {
                                setPhoto(e.target.files)
                            }} className={style.photofile} ></input>
                        </div>
                        <div className={style.hr}>
                            <hr width="800px" color='#d9d9d9' size="1.8" />
                        </div>            
                       
                        <div>
                            <button className={style.submitBtn} onClick={handlersubmit}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default JamWrite;