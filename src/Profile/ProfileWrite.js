import style from '../Profile/ProfileWrite.module.css'


const ProfileWrite = () => {
    return (
        <>
            <div className='container clearfix' >
            <div className={style.loginbackg}>
                    <h1 className={style.login}>프로필 편집</h1>
                    <div className={style.button}>
                    <input className={style.signupinput} placeholder="배너 사진을 첨부해주세요." />
                    <input type="button" className={style.photo} onClick value="사진 첨부" />
                    </div>
                    <div className={style.button}>
                    <input className={style.signupinput} placeholder="프로필 사진을 첨부해주세요." />
                    <input type="button" className={style.photo} onClick value="사진 첨부" />
                    </div>
                    <input className={style.signupinput} placeholder="직군을 입력해주세요." />
                    <input className={style.signupinput} placeholder="사이트 링크를 입력해주세요." />
                    <input className={style.signupinput} placeholder="한줄소개를 입력해주세요." />
                    <br />
                    <button className={style.loginbutton} onclick>저장하기</button>

                </div>


            </div>
        </>

    )
}

export default ProfileWrite;