import style from './ProfileDetail.module.css'
import '../reset.css';
import Header1 from '../Header/Header1';
import img from "./checkbox.png"
import { useEffect, useState } from 'react';
import axios from 'axios';


function ProfileDetail(){
    const [data,setData] = useState('');
    const [user,setUser] = useState('');
    //하드코딩 -> 수정필요 
    const userId = "test"
    useEffect(()=>{
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/profile/${userId}`)
        .then((response)=>{
            console.log(response.data)
            setData(response.data.profile[response.data.profile.length -1])
            setUser(response.data.userDto);
        })
    },[])
    let a = 0;
    return(
        <>
         <Header1 />
            <div className='box1'>
                <h1>게시판</h1>
            </div>
            <div className='container clearfix'>
                <div className={style.profile}>
                    <img className={style.img} src={img}/>
                    <span className={style.name}>{user.userId}</span>
                    {
                        a == 0 && 
                        <img src={img} className={style.certi}></img>
                    }
                    <p style={{marginTop:"10px",marginBottom:"10px"}}>{data.userPosition}</p>
                    <p className={style.comment}>
                        {data.userIntroduction}
                        {/* 한줄 소개 입니다.Lorem ipsum dolor sit amet consectetur. 
                        Aliquam mattis nam rutrum platea lectus lobortis consectetur. */}
                    </p>
                    <p className={style.link} onClick={()=>{window.open('https://google.co.kr','_blank')}}>{data.userSite}</p>
                    <img src={img} className={style.icon}></img>
                    <img src={img} className={style.icon}></img>
                    <img src={img} className={style.icon}></img>
                </div>
                <div className={style.detail}>
                    <div className={style.playbar}>
                        <div>여기에 음악 재생 컴포넌트</div>
                    </div>
                    <div className={style.introduce}>
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                        개인 포토폴리오 들어갈 예정개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                        개인 포토폴리오 들어갈 예정개인 포토폴리오 들어갈 예정
                    개인 포토폴리오 들어갈 예정
                    </div>
                </div>
                <div className={style.review}>
                    <p style={{fontSize:"20px"}}>후기</p>
                    <div className={style.reviewdetail}>
                        <p className={style.reviewtitle}>작업물 제목</p>
                        <p className={style.reviewcontents}>
                            {/* db에 들어갈 수 있는 글자 수 제한하기 */}
                        최고입니다.................. 나서서 작곡 커미션을 넣기는 처음이라 이래저래 걱정이 많았는데, 
                        부족한 설명만으로도 정말 어렴풋이 상상하고 있었던 이미지를 정확히 잡아주셔서 만족스러운 결과물을 받을 수 있었어요... 
                        </p>
                    </div>
                    <div className={style.reviewdetail}>
                        <p className={style.reviewtitle}>작업물 제목</p>
                        <p className={style.reviewcontents}>
                        최고입니다.................. 나서서 작곡 커미션을 넣기는 처음이라 이래저래 걱정이 많았는데, 
                        부족한 설명만으로도 정말 어렴풋이 상상하고 있었던 이미지를 정확히 잡아주셔서 만족스러운 결과물을 받을 수 있었어요... 
                        다음에 꼭 다시 찾아뵙겠습니다...😭😭😭
                        </p>
                    </div>
                    <div className={style.reviewdetail}>
                        <p className={style.reviewtitle}>작업물 제목</p>
                        <p className={style.reviewcontents}>
                        최고입니다.................. 나서서 작곡 커미션을 넣기는 처음이라 이래저래 걱정이 많았는데, 
                        부족한 설명만으로도 정말 어렴풋이 상상하고 있었던 이미지를 정확히 잡아주셔서 만족스러운 결과물을 받을 수 있었어요... 
                        다음에 꼭 다시 찾아뵙겠습니다...😭😭😭
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}
export default ProfileDetail;