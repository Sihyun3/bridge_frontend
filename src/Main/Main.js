import style from './Main.module.css';
import '../reset.css'
import { Link } from 'react-router-dom';
const Main = () => {
    return (
        <div className="container">
            <div className={style.mainBox}>
                <h1 className={style.mainText}>Lorem ipsum dolor sit amet consectetur.</h1>
                <div className={style.firstLine}>
                    <Link to={`/#`}>
                        <button className={style.online}>
                            <p>온라인 합주</p>
                        </button>
                    </Link>
                    <Link to={`/#`}>
                        <button className={style.offline}>
                            <p>오프라인 합주 </p>
                        </button>
                    </Link>
                </div>
                <div className={style.secondLine}>
                    <Link to={`/#`}>
                        <button className={style.musicSep}>
                            <p>음원 분리</p>
                        </button>
                    </Link>
                    <Link to={`/#`}>
                        <button className={style.community}>
                            <p>커뮤니티</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Main;