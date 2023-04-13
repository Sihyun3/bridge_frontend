import style from './ReportPage.module.css';
import '../reset.css'

function ReportPage() {
    return (
        <div className="container">
            <div className={style.Box}>
                <div className={style.Target}>가나다라마바사아자차마파하</div>
                <select className={style.Select} >
                    <option value="" disabled selected>신고 사유 선택</option>
                    <option value="" >나는 바보다</option>
                    <option value="" >나는 바보다</option>
                    <option value="" >나는 바보다</option>
                    <option value="" >나는 바보다</option>
                </select>
                <div className={style.input}><textarea className={style.inner} type="text"></textarea></div>
                <button className={style.button}>신고</button>

            </div>
        </div>
    )
}
export default ReportPage;