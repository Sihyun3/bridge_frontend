import { useState } from 'react';
import ToastEditor from '../Component/ToastEditor'
import '../reset.css'
import style from '../Admin-Notice/NoticeWrite.module.css'

export default function TipWrite() {
    const [title, setTitle] = useState("");
    return (
        <div className="container">
            <div className={style.topbox}><input className={style.titlebox} value={title} onChange={(e) => { setTitle(e.target.value) }} type='text' placeholder='제목'></input>
            </div>
            <div className={style.writebox}>
            <ToastEditor title={title}/>
            </div>
        </div>
    );
};