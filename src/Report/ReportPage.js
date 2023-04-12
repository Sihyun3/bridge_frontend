import style from './ReportPage.module.css';
import '../reset.css'
function ReportPage() {
    return (
        <div className="container">
            <div className={style.Box}>
                <div className={style.Target}>가나다라마바사아자차마파하</div>
                <div className={style.reason}>신고 사유 선택</div>
                <div>
                    <select style={{ outlineStyle: "none" }} >
                        <option value="" disabled selected>영화 선택</option>
                        <option value="" >나는 바보다</option>
                        <option value="" >나는 바보다</option>
                        <option value="" >나는 바보다</option>
                        <option value="" >나는 바보다</option>
                    </select>
                </div>
                <div className={style.input}><input className={style.inner} type="text"></input></div>
            </div>
        </div>
    )
}
export default ReportPage;