import style from '../Profile/ProfileWrite.module.css'
import { useEffect, useState, useRef } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const ProfileWrite = () => {
    
    const [userId, setUserId] = useState('');
    const [position, setPosition] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [userSite, setUserSite] = useState('');
    const [profileImg, setProfileImg] = useState([]);
    const [select, setSelect] = useState('');
    const [music,setMusic] = useState('');
    // const [tag1, setTag1] = useState('');
    // const [tag2, setTag2] = useState('');
    // const [tag3, setTag3] = useState('');
    const [tag, setTag] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUserId(decode_token.sub);
    },[select])


    // 파일 선택창의 값을 직접 제어하기 위해서 사용  
    // const inputFiles = useRef();
    // 파일 크기 및 개수 제한
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
            } 
        }
        setProfileImg([...files]);
    }

    // const handlePosition = (e) => { setPosition(e.target.value); } //직군
    const handleIntroduction = (e) => { setIntroduction(e.target.value); } //소개
    const handleSite = (e) => { setUserSite(e.target.value); } //사이트
    const handleSelect = (e) => {setSelect(e.target.value);};
    // const handleTag1 = (e) => { setTag1(e.target.value); }
    // const handleTag2 = (e) => { setTag2(e.target.value); }
    // const handleTag3 = (e) => { setTag3(e.target.value); }

    // FORM DATA를 저장할 상태 변수를 변수 이름: 값 형식으로 설정
    let datas = {
        userId,
        userSite,
        "userIntroduction": introduction,
        "userPosition": select,
    };

    const handlerInstrument = (e) =>{
        setTag([...tag, e.target.value])
    }

    // 서버로 전달할 폼 데이터를 작성

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append(
            'data',
            new Blob([JSON.stringify(datas)], { type: 'application/json' })
        );
        formData.append(
            'tag',
            new Blob([JSON.stringify({tag:tag})], { type: 'application/json' })
        );
        Object.values(profileImg).forEach(file => formData.append('files', file));
        Object.values(music).forEach(file => formData.append('music', file));

        axios({
            method: 'POST',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/insertProfile/${userId}`,
            headers: { 'Content-Type': 'multipart/form-data;' },
            data: formData
        })
            .then(response => {
                console.log(response);
                // ${response.data}\n
                alert(`정상적으로 업로드했습니다.`);
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
                        <div> 프로필 사진을 첨부해주세요</div>
                        <input type='file' className={style.signupinput} onChange={handleProfile} ref={profileImg} multiple accept="image/*" placeholder="프로필 사진을 첨부해주세요." />
                        {/* <input type="button" className={style.photo} value="사진 첨부" /> */}
                    </div>
                    <div className={style.button}>
                        <div> 프로필 음악을 첨부해주세요</div>
                        <input type='file' className={style.signupinput} onChange={(e)=>{setMusic(e.target.files)}} multiple  placeholder="프로필 음악을 첨부해주세요." />
                        {/* <input type="button" className={style.photo} value="사진 첨부" /> */}
                    </div>
                    <select className={style.signupinput} onChange={handleSelect}>
                        <option value="" disabled selected>포지션 선택</option>
                        <option value="작곡가">작곡가</option>
                        <option value="연주자">연주자</option>
                        <option value="작곡가 겸 연주자">작곡가 겸 연주자</option>
                    </select>

                    <input className={style.signupinput} value={userSite} onChange={handleSite} placeholder="본인을 소개할 수 있는 링크를 입력해주세요." />
                    <input className={style.signupinput} value={introduction} onChange={handleIntroduction} placeholder="한줄소개를 입력해주세요." />
                    <select className={style.signupinput} onChange={handlerInstrument}>
                        <option value="" disabled selected>악기 선택</option>
                        <option value="성악">성악</option>
                        <option value="보컬">보컬</option>
                        <option value="바이올린">바이올린</option>
                        <option value="베이스">베이스</option>
                        <option value="일렉 기타">일렉 기타</option>
                        <option value="건반">건반</option>
                    </select>
                    <div className={style.button}>
                        {
                            tag.map((d)=>{
                                return(<span> {d} </span>)
                            })
                        }
                    </div>
                    {/* <input className={style.signupinput} value={tag1} onChange={handleTag1} placeholder="다룰 수 있는 악기 종류를 입력해주세요" />
                    <input className={style.signupinput} value={tag2} onChange={handleTag2} placeholder="다룰 수 있는 악기 종류를 입력해주세요 (선택)" />
                    <input className={style.signupinput} value={tag3} onChange={handleTag3} placeholder="다룰 수 있는 악기 종류를 입력해주세요 (선택)" /> */}
                    <br />
                    <button className={style.loginbutton} onClick={handleSubmit}>저장하기</button>
                </div>


            </div>
        </>

    )
}

export default ProfileWrite;