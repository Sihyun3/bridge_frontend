import { useRef, useState } from "react";
import axios from "axios";
import Waveform from "./Waveform";

export default function JamDetail2() {
  const [value, setvalue] = useState([]);
  const [data, setData] = useState([]);
  const child = useRef([]);

  // 코맨트
  const [comment, setComment] = useState('');
  const [writer, setWriter] = useState('');


  const [commentList, setCommentList] = useState([]);

  // const commentList = ({ writer, content, created_date }) => {
  //   return (
  //     <div className="commentList">
  //       <div className="info">
  //         <span>
  //           작성자: {writer}
  //         </span>
  //         <br />
  //         <span className="date">
  //           작성 시간: {new Date(created_date).toLocaleString()}
  //         </span>
  //       </div>
  //       <div className="content">
  //         {content}
  //       </div>
  //     </div>
  //   )
  // }

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleChangeWriter = e => {
    setWriter(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log(`ccComments: ${comment}`);
    //cIdx 부분 5번으로 하드코딩 
<<<<<<< HEAD
    axios.post(`http://localhost:8080/api/insertComments/5`, { "userId":writer, "ccComments": comment  })
=======
    axios.post(`http://localhost:8080/api/insertComments/5`, { "userId": writer, "contents": comment })
>>>>>>> 05eb80d18eb71adecd2b441e9cf30e43ca20d57a
      .then(response => {
        console.log(response);
        alert('코맨트가 정상적으로 등록되었습니다')

      })
      .catch(error => {
        console.log(error);
        alert(`오류가 발생했습니다 (${error.message})`);
      });
  };






// 수정
  const handlerClickUpdate = () => {
    axios.put(`http://localhost:8080/api/Comments/5`,  
                  { "userId":writer, "ccComments":comment  })             
        .then(response => {
            if (response.data === 1) {                              
                alert('정상적으로 수정되었습니다.');
            } else { 
                alert('수정에 실패했습니다.');
                return;
            }
        })
        .catch(error => {                   
          console.log(error);
          alert(`수정에 실패했습니다. (${error.message})`);
          return;
      });
};


// 삭제 
const handlerClickDelete = () => {
  axios.delete(`http://localhost:8080/api/CommentsDelete/5`)
      .then(response => {                                         
          console.log(response);
          if (response.data === 1) {                              
              alert('정상적으로 삭제되었습니다.');
              // history.push('/insertComments');				// 정상적으로 삭제되면 목록으로 이동
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

















  // 파일 업로드
  const onSubmit = (e) => {
    e.preventDefault();
    let files = e.target.profile_files.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    axios({
      method: 'POST',
      url: `http://localhost:8080/api/insertmusic`,
      headers: { 'Content-Type': 'multipart/form-data;' },
      data: formData
    }).then((response) => {
      console.log("축 성공");
      let musicInfo = { musicTitle: response.data.fileNames, musicUUID: response.data.uuid }
      setData([...data, musicInfo]);
    }).catch(() => {
      alert(`업로드 중 오류가 발생했습니다.`);
    });
  }

  const onCheckAll = (isChecked) => {
    if (isChecked) {
      // 전체 선택
      const indexArray = data.map((music, index) => index);
      setvalue(indexArray);
    } else {
      // 전체 선택 해제
      setvalue([]);
    }
  }

  // 전체 재생 (자식에서 부모로)
  const allplay = () => {
    value.forEach((index) => {
      child.current[index].PlayAll();
    });
  }

  return (
      <>
        <div>
          <input type="checkbox" checked={value.length === data.length} onChange={(e) => onCheckAll(e.target.checked)} />
          <span>전체 선택</span>
        </div>

        {/* 파형&체크박스 맵 돌린거 */}
          {data.map((musicInfo, index) => {
            return (
              <div key={musicInfo.musicUUID}>
                {/* 체크박스 */}
                <input
                  type="checkbox"
                  checked={value.includes(index)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setvalue([...value, index]);
                    } else {
                      setvalue(value.filter((v) => v !== index));
                    }
                  }}
                />
            {/* 파형 */}
                <Waveform
                  key={musicInfo.musicUUID}
                  src={`http://localhost:8080/api/getMusic/${musicInfo.musicUUID}`}
                  ref={(elem) => (child.current[index] = elem)}
                />
            {/* 노래제목 */}
                  {musicInfo.musicTitle}
          </div>
        );
      })}  {/* 맵 끝*/}

          <button onClick={allplay}>All Play/Pause</button>

          <form onSubmit={(e) => onSubmit(e)}>
            <input type="file" name="profile_files" multiple="multiple" />

            <button type="submit">제출</button>
          </form>

      

      {/* 댓글 목록  */}

      <div className="oneline_list">

                <h2>댓글 목록</h2>
                {/* <h4>{commentList.length}개의 댓글</h4> */}
          
       {/* 작성자만 수정삭제 가능하게 만들어야함 */}
                    <ul className="comment_list"> 

                    { data.map((n) => 
                      return (
                        <li key={n.commentIdx}>
                          <div>
                            <li>작성자 {n.writer}</li>
                            <li>작성일 {n.CreatedDate}</li>
                          </div>
                          <div className="view_contents">
                            <li>내용 {n.comment}</li>
                            <input type="button" id="edit"   className="btn" value="수정하기" onClick={handlerClickUpdate} />
                              <input type="button" id="delete" className="btn" value="삭제하기" onClick={handlerClickDelete} />                             
                          </div>
                        </li>
                      ))}
                    
                    
            

                    </ul>

           

                <form onSubmit={handleCommentSubmit}>
                      <input type="text" id="writer" name="writer" value={writer} onChange={handleChangeWriter} placeholder="작성자" />
                      <input type="text" id="comment" name="comment" value={comment} onChange={handleChangeComment} placeholder="코멘트를 입력하세요" />
                      <button type="submit">작성</button>                          
                </form>


                        
                          

      {/* <div className="one-line-list"> */}
      {/* <ul className="line-list"> */}
      {/* 코맨트 리스트 데이터 출력 */}
      {/* {
            data.map((n) => (
              <li key={n.commentIdx}>
                <div>
                  <span className="whatname">작성자 {n.writer}</span>
                </div>
                <div className="review_info">{n.contents}</div>
              </li>
            ))
          }
        </ul>
      </div> */}

<<<<<<< HEAD
             
    
               
                  </div>
            		</>

    

  
    
=======
      <input type='file' webkitdirectory />

    </>
>>>>>>> 05eb80d18eb71adecd2b441e9cf30e43ca20d57a
  );
}
