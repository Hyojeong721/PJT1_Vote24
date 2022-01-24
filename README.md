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
- PostList.js
  - url을 상단에서 보내주는걸로 바꿔서 서비스공지사항, 병원공지사항, 병원이벤트 모두 사용할 수 있도록 만들기


<br>
### 0122
비동기로 state를 변경할때 주의할점
새로 불러오는 중에 삭제가 이루어지면 기존 items상태가 달라지지만 반영되지 않은상태로 렌더링된다.<br>
그럴 때, 쓰는 prevItems
```
setItems((prevItems) => [...prevItems, ...reviews])
```
이렇게 쓰면됌
<br>
navbar에서 class라고 씀!! className으로 수정 요청 - 지후님
link.js에서도
<br>
파일 인풋태그는 무조건 비제어 컴포넌트로로 해야한다. = 그래서 파일인풋에서는 value 프롭을 쓰면 안된다. 
파일인풋에서 밸류는 파일이름으로 
html에서 파일인풋은 사용자만 바꿀수 있다 = 자바스크립트에서는 바꿀수 없다. = 보안을 위해서 웹브라우저는 파일경로를 숨겨주는건데 


<br>
### formdata를 console.log로 볼 수 없다.
FormData 객체에 대한 설명은 MDN에 위와 같이 안내되어 있다. 단순한 객체가 아닌 XMLHttpRequest 전송을 위해 설계된 특수한 객체 형태라고 볼 수 있다.

따라서 문자열화할 수 없는 객체이기 때문에 console.log를 사용해서 프린트할 수 없다.

만약 전송 전에 FormData의 값을 확인하고 싶다면, 아래와 같이 FormData의 메소드를 사용해야 한다.

// FormData의 key 확인
for (let key of formData.keys()) {
  console.log(key);
}

// FormData의 value 확인
for (let value of formData.values()) {
  console.log(value);
}


### 0124
1. 이벤트 작성에서 시작일이 마감일보다 늦는거 안되게 바꾸기
2. 
