import style from './Doing.module.css'
import '../reset.css';
import Header1 from '../Header/Header1';
import img from "./checkbox.png"

function Doing() {
    const a = 0;
    return (
        <>
            {/* <Header1 /> */}
            <div className='box1'>
                <h1>게시판</h1>
            </div>
            <div className={style.list}>
                <h2>작업 목록</h2>
                <div className={style.doinglist}>
                    <img src={img} />
                    <p>닉네임</p>
                    <p>#악기태그</p>
                </div>
                <div className={style.doinglist}>
                    <img src={img} />
                    <p>닉네임</p>
                    <p>#악기태그</p>
                </div>
            </div>
            <div className='container clearfix'>
                <div className={style.Doing} >
                    <p className={style.teamname}>Team Name</p>
                    <p className={style.isDoing}>현재 작업이 <b style={{ fontWeight: "bold" }}>진행 중</b> 입니다</p>
                    <div className={style.upload}>업로드</div>
                    {a == 0 &&
                        <div className={style.contentsbox}>
                            <p className={style.date}>2023년 4월 7일</p>
                            <div className={style.Doingbox}>
                                <img className={style.img} src={img} />
                                <p className={style.name}>의뢰인</p>
                                <p className={style.contents}>예치금 10,000 원이 결제 되었습니다.</p>
                                <li className={style.clearfix} >
                                    <ul className={style.button}>코멘트</ul>
                                    <ul className={style.button}>펼치기</ul>
                                </li>
                            </div>
                        </div>
                    }
                    {a != 1 &&
                        <>
                            <div className={style.contentsbox} style={{ marginBottom: '15px' }}>
                                <p className={style.date}>2023년 4월 7일</p>
                                <div className={style.Doingbox}>
                                    <img className={style.img} src={img} />
                                    <p className={style.name}>의뢰인</p>
                                    <p className={style.contents}>예치금 10,000 원이 결제 되었습니다.</p>
                                    <li className={style.clearfix} >
                                        <ul className={style.button}>코멘트</ul>
                                        <ul className={style.button}>펼치기</ul>
                                    </li>
                                </div>
                            </div>
                            <div className={style.commentsbox}>
                                <img className={style.commentsimg1} src={img} />
                                <img className={style.commentsimg} src={img} />
                                <p className={style.commentsname}>의뢰인</p>
                                <p className={style.commentscontents}>예치금 10,000 원이 결제 되었습니다.</p>
                                <li className={style.commentsclearfix} >
                                    <ul className={style.commentsbutton}>답장</ul>
                                    <ul className={style.commentsbutton}>펼치기</ul>
                                </li>
                            </div>
                            <div className={style.commentsbox}>
                                <img className={style.commentsimg1} src={img} />
                                <img className={style.commentsimg} src={img} />
                                <p className={style.commentsname}>의뢰인</p>
                                <p className={style.commentscontents}>예치금 10,000 원이 결제 되었습니다.</p>
                                <li className={style.commentsclearfix} >
                                    <ul className={style.commentsbutton}>답장</ul>
                                    <ul className={style.commentsbutton}>펼치기</ul>
                                </li>
                            </div>

                        </>
                    }

                </div>
            </div>
        </>
    )
} export default Doing;