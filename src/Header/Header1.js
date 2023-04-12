import style from './Header1.module.css'
function Header1() {
    return (
        <div className={style.nav}>
            <ul className={style.menu}>
                <li>메인 </li>
                <li>온라인 합주</li>
                <li>파트너 구인</li>
                <li>팁 게시판</li>
                <li>음원 분리</li>
            </ul>
        </div>
    )
} export default Header1
