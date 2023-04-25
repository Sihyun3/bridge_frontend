import { useRef, useState } from "react";
import axios from "axios";
import Waveform from "./Waveform2";

export default function JamDetail2() {
  const [value, setvalue] = useState([]);
  const [data, setData] = useState([]);
  const child = useRef([]);

  // 코맨트
  const [comment, setComment] = useState('');
  const [writer, setWriter] = useState('');

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleChangeWriter = e => {
    setWriter(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log(`Comment: ${comment}`);
    //cIdx 부분 5번으로 하드코딩 
    axios.post(`http://localhost:8080/api/insertComments/5`, { "userId": writer, "contents": comment })
      .then(response => {
        console.log(response);
        alert('코맨트가 정상적으로 등록되었습니다')

      })
      .catch(error => {
        console.log(error);
        alert(`오류가 발생했습니다 (${error.message})`);
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

      <form onSubmit={handleCommentSubmit}>
        <input type="text" id="writer" name="writer" value={writer} onChange={handleChangeWriter} placeholder="작성자" />
        <input type="text" id="comment" name="comment" value={comment} onChange={handleChangeComment} placeholder="코맨트를 입력하세요" />
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

      <input type='file' webkitdirectory />

    </>
  );
}
