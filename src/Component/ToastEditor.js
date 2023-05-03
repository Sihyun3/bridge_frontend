import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useRef } from 'react';
import axios from 'axios';

const ToastEditor = ({title,data}) => {

    const editorRef = useRef(null);
    const handler = (e) =>{
        e.preventDefault();
        console.log("assasasassasasa");
        console.log(data);
        // editorRef.current.getInstance().setHTML(data);
    }
    const submit = (e) => {
        e.preventDefault();
        const files = editorRef.current.getInstance().getHTML();
        console.log(files);
        console.log(typeof(title)) 
        if(!data){
            axios.post(`http://localhost:8080/api/inserttip`,
            { "tbTitle": title, "tbContents" :files },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}}
        )
            .then(response => {
                alert("정상처리 되었습니다.");
            })
            .catch(error => {
                console.log(error)
                alert("오류가 발생하였습니다.");
            })
        }else if(data){
            axios.put(`http://localhost:8080/api/update/tip` , {"tbTitle":title,"tbContents":files,"tbIdx":data.tbIdx},
            ).then(()=>{
                alert("정상 처리 되었습니다.")
            }).catch(()=>{
                alert("오류가 발생하였습니다.");
            })
        }

    }
    return (
        <>
        {
             !data && <Editor
             ref={editorRef}
             // 미리보기 스타일 지정
             previewStyle="vertical"
             // 에디터 창 높이
             height="300px"
             //초기 입력모드 설정
             initialEditType="wysiwyg"
             //입력모드 변경 안보이게
             hideModeSwitch={true}
             //단축키 사용 여부
             useCommandShortcut={true}
             //글자색 변경 플러그인
             plugins={[colorSyntax]}
           />
           
        }
        {
            data && <Editor
            ref={editorRef}
            // 미리보기 스타일 지정
            previewStyle="vertical"
            // 에디터 창 높이
            height="300px"
            //초기 입력모드 설정
            initialEditType="wysiwyg"
            //입력모드 변경 안보이게
            hideModeSwitch={true}
            //단축키 사용 여부
            useCommandShortcut={true}
            //글자색 변경 플러그인
            plugins={[colorSyntax]}

            initialValue={data.tbContents}
          />
        }

            
            {/* <button onClick={showContent}>작성</button> */}
            <button onClick={submit}>디비에 넣기</button>

        </>
    )
};

export default ToastEditor;
