import style from './DealListAd.module.css';
import plus from './plus.png';
import minus from './minus.png';

const DealListAd = () => {
    return (
        <>
            <div className={style.mainBox}>
                <h1 className={style.mainText}>거래내역</h1>
                <div className={style.dealDate}>
                    <p>거래 일자</p> 
                    <input className={style.dealInput1} type='date'/> - <input type='date' className={style.dealInput2}></input>
                    <button className={style.dealButton1}>3개월</button>
                    <button className={style.dealButton2}>6개월</button>
                </div>
                <div className={style.search}>
                   <p>검색하기</p> <input type='text' className={style.searchInput}></input>
                </div>
                <div className={style.buttonBox}>
                <button className={style.initButton}>초기화</button>
                <button className={style.searchButton}>검색</button>
                </div>
                <div className={style.contentBox}>
                    <div className={style.tableText}>총 00건</div>
                    <table>
                        <colgroup className={style.tableCol}>
                        <col width="30%"/>
                        <col width="15%"/>
                        <col width="30%"/>
                        <col width="25%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope='col'>거래 일자</th>
                                <th scope='col'>이름</th>
                                <th scope='col'>입출금</th>
                                <th scope='col'>메모</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023-04-10</td>
                                <td>박소영</td>
                                <td><img src={plus} className={style.plus}></img> 100,000,000원</td>
                                <td>용돈</td>
                            </tr>
                            <tr>
                                <td>2023-04-10</td>
                                <td>박소영</td>
                                <td><img src={minus} className={style.minus}></img> 100,000,000원</td>
                                <td>용돈</td>
                            </tr>
                            <tr>
                                <td>2023-04-10</td>
                                <td>박소영</td>
                                <td><img src={plus} className={style.plus}></img> 100,000,000원</td>
                                <td>용돈</td>
                            </tr>
                            <tr>
                                <td>2023-04-10</td>
                                <td>박소영</td>
                                <td><img src={minus} className={style.minus}></img> 100,000,000원</td>
                                <td>용돈</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DealListAd;