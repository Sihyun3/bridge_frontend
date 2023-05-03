// import { useEffect } from "react";
// import { useState } from "react";
// import jwt_decode from "jwt-decode";
// import axios from "axios";

// const ProjectListPage = () => {

//     const [userId1, setUserId1] = useState('');
//     const [userId2, setUserId2] = useState('');
//     const [pdIdx, setPdIdx] = useState('');

//     const [listArray, setListArray] = useState([
//         {
//             receiver: '',
//             photo: '',
//             tag: ''
//         }
//     ]);

    
    
//     useEffect(() => {
//         console.log(sessionStorage.token);

//         const token = sessionStorage.getItem('token');
//         const decode_token = jwt_decode(token);

//         let userId = decode_token.name;
//         setUserId1(userId);
//         console.log(decode_token);

//         axios.get(`http://localhost:8080/api/bridge/partnerDetail/projectList/${userId}`,
//             { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
//             .then((response) => {
//                 console.log(response);
//                 setListArray(response.data.map((data) => {
//                     return ({
//                         receiver: data.userId2,
//                         photo: data.userPhoto,
//                         tag: data.userTag
//                     })
//                 }))
//             })
//             .catch((error) => {
//                 console.log(error);
//                 return;
//             })


//     }, []);

//     const handlerClickSelect = (index, receiver) => {

//         setUserId2(receiver);
//         const userId22 = receiver;
//         console.log(userId1);
//         console.log(userId2);

//         axios.get(`http://localhost:8080/api/bridge/partnerDetail/paylist/${userId1}/${userId22}`,
//             { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
//             .then((response) => {
//                 console.log(response);
//                 setPayList({
//                     sender: response.data.userId1,
//                     receiver: response.data.userId2,
//                     money: response.data.plMoney,
//                     date: response.data.plDate
//                 })
//             }).catch((error) => {
//                 return;
//             }
//             )

//         setPdIdx(index);
//         const pdIdx1 = index;
//         console.log(pdIdx);
//         axios.get(`http://localhost:8080/api/bridge/partnerdetail/${pdIdx1}`
//         )
//             .then(response => {
//                 console.log(response);
//                 setContentList(response.data.map((data) => {
//                     return ({
//                         number: data.pcIdx,
//                         content: data.pcContent,
//                         writer: data.pcWriter
//                     });
//                 }));
//             })
//             .catch(error => {
//                 console.log(error);
//                 if (error.response.status === 403) {
//                     alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
//                     history.push('/3');
//                 }
//             });
//         // console.log(index);
//         // return (index);
//     }


//     const ProjectList = () => {
//         // console.log(listArray);
    
//         return listArray && listArray.map((value, index) => {
//             return (
//                 <>
//                     <div key={index}>
//                         <button onClick={() => setPdIdx(handlerClickSelect(index + 1, value.receiver))}>
//                             상대 닉네임 : {value.receiver} <br/>
//                             상대 프로필이미지 : {value.photo} <br/>
//                             상대 악기태그: {value.tag}
//                         </button>
//                     </div>
//                     {console.log(pdIdx)}
//                 </>
//             );
//         });
//     };
// }

// export default ProjectListPage;