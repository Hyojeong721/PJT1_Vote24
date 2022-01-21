# Vote24
설문조사플랫폼 프로젝트 개발 일지

<br>
### 0121
#### 게시판 목록
- 서버에서 게시판 목록 데이터 받아오기
  ```
   const getList = async () => {
    const res = await axios.get(`http://teama205.iptime.org/api/event/947780`);
    console.log(typeof res);
    setList(res);
  };
  ```
  axios로 json 파일을 받아오면 res의 형태는 object이다.
  <br>
  ** 추가 수정사항
  - 지금은 게시글 제목을 눌렀을때만 link로 연결되는데 행 선택을 했을때 링크연결되게 만들기
  - 
