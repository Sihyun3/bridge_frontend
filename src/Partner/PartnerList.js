import style from '../Partner/PartnerList.module.css'
import Header1 from '../Header/Header1'

const Partner = () => {
    return (
        <>
            <Header1 />
            <div className={style.box1}>
                <h1>파트너 모집</h1>
            </div>
            <div className='container clearfix' >
                <div className={style.tagbox}>
                    <div className={style.tag}><h2>#태그</h2></div>
                    <div className={style.taglist}>
                        <a>#여성보컬</a>
                        <a>#베이스기타</a>
                        <a>#플룻</a>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Partner;