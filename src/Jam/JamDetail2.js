import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Waveform from "../Component/Waveform";
import { Co2Sharp } from "@mui/icons-material";
import jwt_decode from "jwt-decode";

export default function JamDetail2() {

    const [value, setvalue] = useState([]);
    const [data, setData] = useState([]);
    const child = useRef([]);

    // 코멘트
    const [comment, setComment] = useState('');
    const [writer, setWriter] = useState('');
    const [commentsList, setCommentsList] = useState([]);

    //추가
    const [insert, setInsert] = useState(0);

    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    const handleChangeWriter = e => {
        setWriter(e.target.value);
    };


<<<<<<< HEAD
  // 코멘트 등록 핸들러
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    //cIdx 부분 1번으로 하드코딩==> 수정 필요
    axios.post(`http://localhost:8080/api/insertComments/1`, { "userId": writer, "ccComments": comment })
      .then(response => {
        console.log(response);
        setInsert(insert + 1);
        alert('코맨트가 정상적으로 등록되었습니다')

      })
      .catch(error => {
        console.log(error);
        alert(`오류가 발생했습니다 (${error.message})`);
      });
  };

  // 코멘트 삭제 핸들러
  const handlerClickDelete = (ccIdx) => {
    axios.delete(`http://localhost:8080/api/CommentsDelete/${ccIdx}`)
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

  // 잼 음악 파일 업로드 axios Post
  const onSubmit = (e) => {
    e.preventDefault();
    let files = e.target.profile_files.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    axios({
      method: 'POST',
      //cIdx 1번으로 하드코딩
      url: `http://localhost:8080/api/insertmusic/1`,
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

  //잼 체크 박스 전체 선택 
  const onCheckAll = (isChecked) => {
    if (isChecked) {
      const indexArray = data.map((music, index) => index);
      setvalue(indexArray);
    } else {
      setvalue([]);
    }
  }

  // 잼 전체 재생 (자식에서 부모로)
  const allplay = () => {
    value.forEach((index) => {
      child.current[index].PlayAll();
    });
  }
  const test = ()=>{
    setData([...data, 1])
  }

  return (
    <>
      {/* 전체선택하는 체크박스 */}
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
            data={data}
              key={musicInfo.musicUUID}
              src={`http://localhost:8080/api/insertmusic/rkskek.mp3`}
              ref={(elem) => (child.current[index] = elem)}
            />
            {/* 노래제목 */}
            {musicInfo.musicTitle}
          </div>
        );
      })}  {/* 맵 끝*/}

      {/* 잼 전체 재생 버튼 */}
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
      <button onClick={test}>test</button>
      {/* <div className="one-line-list"> */}
        {/* <ul className="line-list"> */}
          {/* 코맨트 리스트 데이터 출력 */}
          {/* {
            data.map((n) => (
              <li key={n.commentIdx}>
      {/* 댓글 목록  map*/}
      {/* 작성자만 삭제 가능하게 만들어야함  ==> 수정 필요*/}
      <hr />
      <br />
      <br />
      <div>
        <h2>댓글 목록</h2>
        <hr />
        <ul className="comment_list">
          {commentsList.map(commentsList => {
            return (
              <li key={commentsList.commentIdx}>
                <div>
                  <li>작성자 {commentsList.userId}</li>
                  <li>작성일 {commentsList.cdate}</li>
                </div>
                <div className="view_contents">
                  <li>내용 {commentsList.ccComments}</li>
                  <input type="button" className="btn" value="삭제" onClick={() => handlerClickDelete(commentsList.ccIdx)} />
                </div>
                <hr />
              </li>
=======
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/openComments/1`)
            .then(response => {
                setCommentsList(response.data.selectCommentsList)
                const token = sessionStorage.getItem('token');
                console.log("111111111" + token);
                const decode_token = jwt_decode(token);
                console.log("222222222" + decode_token);
                setWriter(decode_token.sub);
            }
>>>>>>> b7ba2cdb6019baca0a57afcb019b3cd69641535f
            )
            .catch(error => console.log(error));
    }, [insert]);
    //commentsList

    // 코멘트 등록 핸들러
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        //cIdx 부분 1번으로 하드코딩==> 수정 필요
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertComments/1`, { "userId": writer, "ccComments": comment })
            .then(response => {
                console.log(response);
                setInsert(insert + 1);
                alert('코맨트가 정상적으로 등록되었습니다')

            })
            .catch(error => {
                console.log(error);
                alert(`오류가 발생했습니다 (${error.message})`);
            });
    };

    // 코멘트 삭제 핸들러
    const handlerClickDelete = (ccIdx) => {
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/CommentsDelete/${ccIdx}`)
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

    // 잼 음악 파일 업로드 axios Post
    const onSubmit = (e) => {
        e.preventDefault();
        let files = e.target.profile_files.files;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        axios({
            method: 'POST',
            //cIdx 1번으로 하드코딩
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertmusic/1`,
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

    //잼 체크 박스 전체 선택 
    const onCheckAll = (isChecked) => {
        if (isChecked) {
            const indexArray = data.map((music, index) => index);
            setvalue(indexArray);
        } else {
            setvalue([]);
        }
    }

    // 잼 전체 재생 (자식에서 부모로)
    const allplay = () => {
        value.forEach((index) => {
            child.current[index].PlayAll();
        });
    }
    const test = () => {
        setData([...data, 1])
    }

    return (
        <>
            {/* 전체선택하는 체크박스 */}
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
                            data={data}
                            key={musicInfo.musicUUID}
                            src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertmusic/rkskek.mp3`}
                            ref={(elem) => (child.current[index] = elem)}
                        />
                        {/* 노래제목 */}
                        {musicInfo.musicTitle}
                    </div>
                );
            })}  {/* 맵 끝*/}

            {/* 잼 전체 재생 버튼 */}
            <button onClick={allplay}>All Play/Pause</button>

            <form onSubmit={(e) => onSubmit(e)}>
                <input type="file" name="profile_files" multiple="multiple" />
                <button type="submit">제출</button>
            </form>

            {/* 댓글 목록  map*/}
            {/* 작성자만 삭제 가능하게 만들어야함  ==> 수정 필요*/}
            <hr />
            <br />
            <br />
            <div>
                <h2>댓글 목록</h2>
                <hr />
                <ul className="comment_list">
                    {commentsList.map(commentsList => {
                        return (
                            <li key={commentsList.commentIdx}>
                                <div>
                                    <li>작성자 {commentsList.userId}</li>
                                    <li>작성일 {commentsList.cdate}</li>
                                </div>
                                <div className="view_contents">
                                    <li>내용 {commentsList.ccComments}</li>
                                    <input type="button" className="btn" value="삭제" onClick={() => handlerClickDelete(commentsList.ccIdx)} />
                                </div>
                                <hr />
                            </li>
                        )
                    })
                    }
                </ul>
            </div>

            {/* 코멘트 작성 폼 */}
            <form onSubmit={handleCommentSubmit}>
                <input type="text" id="writer" name="writer" value={writer} readOnly />
                <input type="text" id="comment" name="comment" value={comment} onChange={handleChangeComment} placeholder="코멘트를 입력하세요" />
                <button type="submit">작성</button>
            </form>
        </>
    )
};
