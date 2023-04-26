import { useState } from "react";
import axios from "axios";
import Waveform from "../Waveform";

const MusicSplit = () => {

  const [data, setData] = useState([]);
  const [musicUUID, setMusicUUID] = useState('');
  const [files, setFiles] = useState([]);

  //컨테이너 true 면 loading
  const [isLoading, setIsLoading] = useState(false);
  //컨테이너 false 면 completed
  const [isSplitCompleted, setIsSplitCompleted] = useState(false);


  // 분리할 음원 파일 업로드
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
      alert(`업로드가 성공했습니다. 분리 시작 버튼을 눌러주세요.`)
    }).catch(() => {
      alert(`업로드 중 오류가 발생했습니다.`);
    });
  };

  // 분리 확인 버튼 연결 핸들러
  const handleCheck = (e) => {
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

  // 분리 시작 버튼 클릭시 함수2개 호출
  const startSplit = () => {
    handleMusicSplit();
    handleIsRunning();
  }
  // 음원 분리 컨테이너 실행
  const handleMusicSplit = () => {
    axios.get(`http://localhost:8080/api/docker/${musicUUID}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        console.log("분리 오류 url ==> " + `/api/docker/${musicUUID}`);
        alert(`오류가 발생했습니다 (${error.message})`);
      });
  };

  //컨테이너 동작 확인 버튼 핸들러
  const handleIsRunning = () => {
    setIsLoading(true);
    setIsSplitCompleted(false);

    const interval = setInterval(() => {
      axios.get(`http://localhost:8080/api/IsDockerRun`)
        .then(response => {
          if (response.data === false) {
            clearInterval(interval);
            setIsLoading(false);
            setIsSplitCompleted(true);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 1000);
  };


  return (

    <>
      {/* 분리할 음원 파일 제출하는 form  */}
      <form onSubmit={(e) => musicSubmit(e)}>
        <input type="file" name="profile_files" multiple="multiple" />
        <button type="submit">제출</button>
      </form>

      <button onClick={startSplit}>분리 시작</button>

      <div>
        <ul>
          {/* 분리 상태 메세지 */}
          {isLoading && <div> 분리중입니다.</div>}
          {isSplitCompleted && <div> 분리가 완료되었습니다.</div>}

          {/* 분리된 음원파일 다운로드 링크 및 재생 파형 만드는 Map */}
          {
            files && files.map(fn => {
              const url = `http://localhost:8080/api/downloadSplitedMusic/${musicUUID}/${fn}`;
              return (
                <>
                  <li><a href={url}>{fn}</a></li>
                  <Waveform src={`http://localhost:8080/api/getSplitedMusic/${musicUUID}/${fn}`} />
                </>
              )
            })
          }
        </ul>
      </div>

      {/* 분리확인 버튼 클릭시 위에서 만들어진 map 이 화면에 보여짐 */}
      <div>
        <button onClick={handleCheck}>분리 확인</button>
      </div>
    </>
  );
};


export default MusicSplit;