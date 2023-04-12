import style from './DealListAd.module.css';

const DealListAd = () => {
    return (
        <>
            <div className={style.mainBox}>
                <h1 className={style.mainText}>거래내역</h1>
                <div className={style.dealDate}>
                    거래 일자 
                    <input type='date'></input> - <input type='date'></input>
                </div>
                <div className={style.search}>
                    검색하기 <input type='text'></input>
                </div>
                <button>초기화</button>
                <button>검색</button>
                <div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default DealListAd;