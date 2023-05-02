import style from '../Profile/ProfileWrite.module.css'
import { useEffect, useState, useRef } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const ProfileWrite = () => {

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUserId(decode_token.sub);
    })

    const [userId, setUserId] = useState('');
    const [position, setPosition] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [userSite, setUserSite] = useState('');
    const [profileImg, setProfileImg] = useState([]);

    // 파일 선택창의 값을 직접 제어하기 위해서 사용  
    // const inputFiles = useRef();
    // 파일 크기 및 개수 제한
    const MAX_FILE_SIZE = 1 * 1024 * 1024; //1MB
    const MAX_FILE_COUNT = 1;

    // 파일 종류, 크기, 개수 제한을 벗어나는 경우 메시지를 보여주고, 
    // 파일 입력창을 초기화하는 함수
    const isNotValid = msg => {
        alert(msg);
        profileImg.current.value = '';
        setProfileImg([]);
    };

    const handleProfile = (e) => {
        const files = e.target.files;
        if (files.length > MAX_FILE_COUNT) {
            isNotValid("이미지는 최대 1개 까지 업로드가 가능합니다.");
            return;
        }
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match("image/.*")) {
                isNotValid("이미지 파일만 업로드 가능합니다.");
                return;
            } else if (files[i].size > MAX_FILE_SIZE) {
                isNotValid("이미지 크기는 1MB를 초과할 수 없습니다.");
                return;
            }
        }
        setProfileImg([...files]);
    }

    const handlePosition = (e) => { setPosition(e.target.value); } //직군
    const handleIntroduction = (e) => { setIntroduction(e.target.value); } //소개
    const handleSite = (e) => {setUserSite(e.target.value);} //사이트

 // FORM DATA를 저장할 상태 변수를 변수 이름: 값 형식으로 설정
  let datas = {
    userId,
    userSite,
    "userIntroduction":introduction,
    "userPosition":position
  };

  // 서버로 전달할 폼 데이터를 작성
  const formData = new FormData();
  formData.append(
    'data',
    new Blob([JSON.stringify(datas)], { type: 'application/json' })
  );
  Object.values(profileImg).forEach(file => formData.append('files', file));

  const handleSubmit = () => {
    axios({
        method: 'POST',
        url: `http://localhost:8080/api/insertProfile/${userId}`,
        headers: { 'Content-Type': 'multipart/form-data;' },
        data: formData
      })
        .then(response => {
          console.log(response);
          alert(`${response.data}\n정상적으로 업로드했습니다.`);
        })
        .catch(error => {
          console.log(error);
          alert(`업로드 중 오류가 발생했습니다.`);
        });
  };

    return (
        <>
            <div className='container clearfix' >
                <div className={style.loginbackg}>
                    <h1 className={style.login}>프로필 편집</h1>
                    {/* <div className={style.button}>
                        <input type='file' className={style.signupinput} ref={banner} onChange={handleBanner} multiple accept="image/*" placeholder="배너 사진을 첨부해주세요." />
                        <input type="button" className={style.photo} value="사진 첨부" />
                    </div> */}
                    <div className={style.button}>
                        <input type='file' className={style.signupinput} onChange={handleProfile} ref={profileImg} multiple accept="image/*" placeholder="프로필 사진을 첨부해주세요." />
                        <input type="button" className={style.photo} value="사진 첨부" />
                    </div>
                    <input className={style.signupinput} value={position} onChange={handlePosition} placeholder="직군을 입력해주세요." />
                    <input className={style.signupinput} value={userSite} onChange={handleSite} placeholder="사이트 링크를 입력해주세요." />
                    <input className={style.signupinput} value={introduction} onChange={handleIntroduction} placeholder="한줄소개를 입력해주세요." />
                    <br />
                    <button className={style.loginbutton} onClick={handleSubmit}>저장하기</button>

                </div>


            </div>
        </>

    )
}

export default ProfileWrite;