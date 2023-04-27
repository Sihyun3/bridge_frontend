import { useState } from 'react';
import ToastEditor from '../Component/ToastEditor'
import '../reset.css'

export default function TipWrite(){
    const [title,setTitle] = useState("");
    return(
        <div className="container">
            <div><span>제목 : </span><input value={title} onChange={(e)=>{setTitle(e.target.value)}} type='text'></input></div>
        <ToastEditor title={title}></ToastEditor>
        </div>
    );
};