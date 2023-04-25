import { useState } from "react";
import axios from "axios";

const MusicSplit = () => {

  const [data, setData] = useState([]);
  const [musicUUID, setMusicUUID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSplitCompleted, setIsSplitCompleted] = useState(false);

  const [files, setFiles] = useState([]);

  // 파일 업로드
  const musicSubmit = (e) => {
    e.preventDefault();
    let files = e.target.profile_files.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    axios({
      method: 'POST',
      url: `http://localhost:8080/api/insertMusicForSplit`,
      headers: { 'Content-Type': 'multipart/form-data;' },
      data: formData
    }).then((response) => {
      console.log("축 성공");
      let musicInfo = { musicTitle: response.data.fileNames, musicUUID: response.data.uuid }
      setData([...data, musicInfo]);
      console.log(response.data.uuid);
      setMusicUUID(response.data.uuid);
    }).catch(() => {
      alert(`업로드 중 오류가 발생했습니다.`);
    });
  }


  // 음원 분리 버튼 핸들러
  const handleMusicSplit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.get(`http://localhost:8080/api/docker/${musicUUID}`)
      .then(response => {
        console.log(response);
        setIsLoading(false);
        setIsSplitCompleted(true);
      })
      .catch(error => {
        console.log(error);
        console.log(`/api/docker/${musicUUID}`);
        alert(`오류가 발생했습니다 (${error.message})`);
        setIsLoading(false);
      });
  };

  const handelDownload = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/api/splitedMusic/${musicUUID}`)
      .then(response => {
        const fileNames = response.data;
        if (fileNames.length === 0) {
          alert('분리된 음악 파일이 존재하지 않습니다.');
        } else {
          setFiles(fileNames);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (

    <>
      <form onSubmit={(e) => musicSubmit(e)}>
        <input type="file" name="profile_files" multiple="multiple" />
        <button type="submit">제출</button>
      </form>

      <button onClick={handleMusicSplit}>분리</button>


      <div>
        <ul>
          {!files && <li>분리 중 입니다.</li>}
          {
            files && files.map(fn => {
              const url = `http://localhost:8080/api/downloadSplitedMusic/${musicUUID}/${fn}`;
              return (
                <li><a href={url}>{fn}</a></li>
              )
            })
          }
        </ul>
      </div>

      <div>
        <button onClick={handelDownload}>분리확인</button>
      </div>
      {isLoading && <div>로딩중...</div>}
      {isSplitCompleted && <div>분리가 시작되었습니다.</div>}
    </>
  );
};


export default MusicSplit;