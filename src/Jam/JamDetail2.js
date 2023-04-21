import { useRef, useState } from "react";
import axios from "axios";
import Waveform from "./Waveform";

export default function JamDetail2() {
  const [value, setvalue] = useState([]);
  const [data, setData] = useState([]);
  const child = useRef([]);

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

      {data.map((musicInfo, index) => {
        return (
          <div key={musicInfo.musicUUID}>
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
            <Waveform
              key={musicInfo.musicUUID}
              src={`http://localhost:8080/api/getMusic/${musicInfo.musicUUID}`}
              ref={(elem) => (child.current[index] = elem)}
            />
            {musicInfo.musicTitle}
          </div>
        );
      })}

      <br />
      <button onClick={allplay}>All Play/Pause</button>

      <br />
      <hr />
      <br />

      <form onSubmit={(e) => onSubmit(e)}>
        <input type="file" name="profile_files" multiple="multiple" />
        <button type="submit">제출</button>
      </form>
    </>
  );
}


