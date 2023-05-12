import style from '../Partner/PartnerList.module.css';
import Header1 from '../Header/Header1';
import img from '../img/checkbox.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';

const PartnerList = () => {
  const [partnerList, setPartnerList] = useState([]);
  const [partnerTag, setPartnerTag] = useState([]);
  const [tag, setTag] = useState('');

  //페이징
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);


  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (partnerList) => {
    let currentPosts = 0;
    currentPosts = partnerList.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };


  const tags = [
    { name: '여성보컬' },
    { name: '남성보컬' },
    { name: '일렉기타' },
    { name: '어쿠스틱기타' },
    { name: '베이스기타' },
    { name: '드럼' },
    { name: '퍼커션' },
    { name: '브라스' },
    { name: '바이올린' },
    { name: '첼로' },
    { name: '콘트라베이스' },
    { name: '피아노' },
    { name: '신디사이저' }
  ];

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/openPartnerList`)
      .then((response) => {
        console.log(response.data);
        setPartnerList(response.data.partnerList);
        axios
          .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/openTagList`)
          .then((response) => {
            setPartnerTag(response.data.partnerTag);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRadio = (e) => {
    setTag(e.target.value);
  };

  const clearRadio = () => {
    setTag('');
  };


  return (
    <>
      
      <div className={style.box1}>
        <h1>파트너 모집</h1>
      </div>
      <div className="container clearfix">
        <div className={style.tagbox}>
          
            <h2>#태그</h2>
          
          {tags.map((tags, index) => {
            if (index % 5 == 0) {
              return (<>   <label className={style.tags} for={`tagRadio-${index}`}>
              <button
              key={index}
                className={style.taglists}
                id={`tagRadio-${index}`}
                value={tags.name}
                onClick={handleRadio}
              />
             #{tags.name}</label></>)
            }
            return (
              // <span className={style.taglist} key={index}>
              <label className={style.tags} for={`tagRadio-${index}`}>
                <button
                key={index}
                  className={style.taglists}
                  id={`tagRadio-${index}`}
                  value={tags.name}
                  onClick={handleRadio}
                />
               #{tags.name}</label>
              // </span>
            );
          })}
          <button className={style.tags} onClick={clearRadio}>#전체</button>
        </div>
        <div className="clearfix" style={{ margin: '50px 0' }}>
          {
          currentPosts(partnerList) && currentPosts(partnerList)
            .filter((partnerList) => (tag === '') || partnerTag.some((partnerTag) => partnerList.crIdx == partnerTag.crIdx && partnerTag.crtTag == tag))
            .map((partnerList, index) => {
              return (
                <div key={index} className={style.block}>
                  <Link to={`/bridge/partner/detail/${partnerList.crIdx}`}><img className={style.img} src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getMusic/${partnerList.crPhoto}`} alt="" /></Link>
                  {/* <p className={style.title}>{partnerList.userId}</p> */}
<<<<<<< HEAD
                  <Link to={`/partner/detail/${partnerList.crIdx}`}><p className={style.title}>{partnerList.crTitle}</p></Link>
                  <p className={style.date}>
                    {partnerList.crStartDate} ~ {partnerList.crEndDate}
                  </p>
                  <div className={style.tagblock}>
=======
                  <Link to={`/bridge/partner/detail/${partnerList.crIdx}`}><p className={style.title}>{partnerList.crTitle}</p></Link>
                  <div>
>>>>>>> 624be135895caffb5c17cce21ceb14d596130fdd
                    {partnerTag
                      .filter((tag) => partnerList.crIdx === tag.crIdx)
                      .map((tag, tagIndex) => {
                        // console.log(3%3)
                        if (tagIndex % 3 == 0) {
                          return (<><br /><span className={style.tag} key={tagIndex}>#{tag.crtTag} </span> </>)
                        }
                        return (<span className={style.tag} key={tagIndex}>#{tag.crtTag} </span>);
                      }


                      )}
                  </div>
              
                </div>
              );
            })}
        </div>

        <div className={style.buttonbox}>
        <Link to={`/bridge/partner/write`}><button > 파트너 찾기 </button></Link>
        </div>

        <div style={{margin:"0 auto"}} className='clearfix'>
          <Pagination
            className={style.page}
            postsPerPage={postsPerPage}
            totalPosts={partnerList.length}
            paginate={setCurrentPage}
          ></Pagination>
        </div>


      </div>
    </>
  );
};

export default PartnerList;