# readme

# 주문 내역 관리 어드민 페이지

원티드 프리온보딩 인턴십 프론트엔드 9차 4주차 과제

## 배포 링크 🔗

[Admin Order List](https://pre-onboarding-9th-4-2-git-issue6-jiwonmik.vercel.app/admin)

## 실행 방법 👟

```bash
yarn install
yarn dev
```

## 테스트 방법

```bash
# 테스트 실행(node.js version 18+ 에서 진행해주세요)
npm run test
```

## 디렉토리 구조 📂

```
📦src
 ┣ 📂api
 ┃ ┗ 📜api.ts
 ┣ 📂common
 ┃ ┣ 📜order.ts
 ┃ ┗ 📜types.ts
 ┣ 📂components
 ┃ ┣ 📂Admin               // 어드민 페이지 구성 컴포넌트
 ┃ ┃ ┣ 📜AdminFilter.tsx
 ┃ ┃ ┣ 📜AdminTable.test.tsx
 ┃ ┃ ┣ 📜AdminTable.tsx
 ┃ ┃ ┣ 📜AdminTableBody.tsx
 ┃ ┃ ┗ 📜AdminTableHead.tsx
 ┃ ┣ 📂Pagination          // 페이지네이션 컴포넌트
 ┃ ┃ ┣ 📜Pagination.test.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styled.ts
 ┃ ┗ 📜Layout.tsx
 ┣ 📂hooks                 // 데이터 처리 커스텀 훅
 ┃ ┗ 📜useData.tsx
 ┣ 📂pages                 // 라우팅 경로 별 페이지
 ┃ ┣ 📜Admin.test.tsx
 ┃ ┣ 📜Admin.tsx
 ┃ ┣ 📜AdminNotFound.tsx
 ┃ ┗ 📜NotFound.tsx
 ┣ 📂utils
 ┃ ┣ 📜tableFunc.tsx.       // 테이블 데이터 처리 함수
 ┃ ┗ 📜test.wrapper.tsx     // 테스트 코드를 위한 Provider Wrapper
 ┣ 📜App.tsx
 ┣ 📜Router.tsx
 ┗ 📜setup.ts
```

## 사용 기술 스택 🔨

| 사용처 | 사용 기술 | 결정 사유 |
| --- | --- | --- |
| 프레임워크 | React (Vite) | - CRA와 비교했을 때 매우 효율적으로 번들링 작업 진행 |
| 언어 | Typescript(Javascript) | - 더 안정적인 코드 작성: 컴파일 과정에서 버그를 사전에 찾을 수 있음 <br /> - 개발 생산성 향상: 자동완성, 타입체크, 에러 표시 도구 제공 <br /> - 코드 가독성 향상: 개발자가 코드를 이해하고 유지보수하기 쉽게 만듦 |
| 라우팅 처리 | react-router-dom | - params를 이용한 필터링 적용 |
| 데이터 처리 | React Query | - 데이터 캐싱 및 refetch 등 데이터를 상태에 따라 쉽게 다룰 수 있음 |
| 코드 포매팅 | ESLint |  |
| 테스트 프레임워크 | Vitest | - Vite 환경에서 Jest 보다 Vitest이 적합하다고 판단 |
| 스타일 | Chakra UI | - 재사용 가능한 사용자 인터페이스 빠른 구축 가능 |
| 아이콘 | chakra-ui/icons |  |

## 주안점 💫

### 공통 레이아웃 적용

- 공통 레이아웃 `Layout` 컴포넌트 라우팅 처리 후 자식 라우터로 `/admin` 중첩 라우팅 처리

### 데이터 불러오기 - 비동기 처리

- `useQuery` hook 사용하여 데이터 불러오는 custom hook 생성
- 데이터 로딩 중(`isLoading`) 일 경우 Skeleton 렌더링
- `errorElement`로 **Error Boundary** 를 만들어줌
    - `Admin` 컴포넌트 렌더링 시 문제 발생하더라도 공통 레이아웃 컴포넌트는 정상적으로 렌더링 됨

## 과제 요구사항

### 1. **주문 목록 페이지 구현 (페이지네이션)**

### 데이터 처리 로직 순서

1. `useData` 커스텀 훅에서 `mock_data.json` 데이터 불러온 후, 오늘의 거래건만 추출
2. `searchByName` ⇒  `filterBystatus` ⇒ `pagination` ⇒ `sortByField`
    - 페이지네이션 함수로 해당 페이지에 보여줄 데이터 추출
    - `status`, `name`, `field` 모두 파라미터 값이 있다면 필터링 처리

### 2. **정렬 구현**

- 저번 과제 피드백의 필터 정보는 useState가 아닌 **url parameter**(query string)로 관리해야 하는 부분을 고려하여 구현하였습니다.
- 필터 정보 모두 parameter로 넘깁니다. (아래와 같은 형태)

`?offset=0&limit=50&sort=transaction_time&order=dec&name=ann&status=false`

- **페이지네이션** (ex.`offset=0&limit=50`)
    - `offset`: 데이터 시작 위치
    - `limit`: 페이지 당 데이터 개수 (과제 조건: 50개)
- **정렬**: (ex. `sort=transaction_time&order=dec`)
    - `sort`: 정렬 대상 필드 (과제 조건: `id`, `transaction_time`)
    - `order`: 정렬 순서 (과제 조건: 기본 정렬: `id`값 오름차순,)
- **status(주문처리상태) 필터**: (ex. `status=false`)
    - `status`: 주문 처리 상태(`true` 또는 `false` 또는 `all`)
- **검색**: (ex. `name=ann`)
    - `name`: 사용자가 입력한 이름

### 3. 필터링 구현

### 직관적인 정렬 UX | 클릭 반복에 따른 재정렬 및 필터링

- 과제 요구사항에 따라 한 번 클릭 시 내림차순으로 정렬되지만 직관적 사용을 위해 반복 클릭에 따른 재정렬 구현
    - 한 번 클릭 : 내림차순 정렬
    - 두 번 클릭 : 오름차순 정렬
    - 세 번 클릭 : 원상복구
    - 반복
- UI의 시각적인 요소를 고려하여 내림차순 일 경우 ▼, 오름차순일 경우 ▲, 기본 정렬(default)일 경우 ⇕ 아이콘 표시

### 4. 고객 이름 검색 구현

- `includes` 사용하여 검색 문자 포함하는 모든 데이터 필터링
- `.toLowercase()`로 소문자화하여 일치(포함) 여부 확인

### 로직 순서

1. 검색창에 고객 이름 입력 후 Enter 키 입력 or 검색 버튼 클릭 시 query string parameter 붙임
2. useData 커스텀 훅 에서 검색된 이름에 해당하는 데이터만 필터링
3. 검색창이 비어있을 경우 전체 데이터 렌더링
    - UX를 위해 입력창 내용을 다 지웠을 경우(내용이 비어있는 경우) 자동으로 전체 데이터 보여주도록 처리

### 5. **서버 데이터 최신화 구현**

### 데이터 5초마다 최신화

- `useQuery`의 `refetchInterval` 옵션의 값을 `5000`으로 설정하여 5초마다 refetch되도록 설정
- 과제 요구 조건의 경우, 5초마다 데이터를 최신화(캐싱 데이터를 사용하기에는 상대적으로 짧은 시간)하기 이므로 staleTime과 cacheTime 옵션 설정을 통한 refetch 조절 방식은 적절하지 않다고 판단
- 따라서 `refetchInterval` 옵션을 사용하여 5초마다 refetch 수행하도록 함
- 5초마다 refetch 되므로 `refetchOnMount`, `refetchOnWindowFocus` false 설정하여 불필요한 refetch 방지
    - (1) 새로운 query instance가 mount될 때 (page 이동했다가 왔을 때) refetch 방지 (`refetchOnMount`)
    - (2) 브라우저 화면을 이탈했다가 다시 focus 할 때 refetch 방지(`refetchOnWindowFocus`)

```jsx
  const { isLoading, isError, data, error } = useQuery<IData[], Error>('switchone', fetchData, {
    refetchInterval: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
```

### RTL & Vitest 사용

- vite 기반 프로젝트이기 때문에  복잡한 환경설정 없이 사용할 수 있는 vitest사용

### 테스트 코드 작성 시 고려한 부분

- 유저가 행동하듯이 테스트 코드를 짜고 테스트를 작성해보았습니다.
    - [RTL의 기본 원칙](https://testing-library.com/docs/guiding-principles)에 따르면 테스트는 사용자가 코드(구성 요소, 페이지 등)와 상호 작용하는 방식과 최대한 유사해야 합니다. 이를 고려하여 요소를 가져오는 메서드 사용에 대해 권장하는 우선 순위가 있습니다.
    - 첫 번째 우선순위가 `getByRole`인데, accessibility test & components test 를 동시에 할 수 있기 때문에, 최대한 해당 메서드를 사용하고자 했습니다.
    - role이 지정되지 않는 요소의 경우 `getByLabelText` 를 사용하였습니다.
- 과제 요구사항에 해당하는 기능들 위주로 테스트 코드 작성 후 테스트를 진행하였습니다.

### 테스트케이스

1. Admin 페이지: /admin 경로 접근 시
    - 데이터 로딩 중 컴포넌트 정상 렌더링 확인
    - 데이터 로드 후 컴포넌트 정상 렌더링 확인
2. AdminTable
    - status 필터링 버튼 클릭 시 AdminTable에 렌더링 되는 데이터가 제대로 필터링 되는지 확인(true, false, all)
    - 고객 이름 검색 시 데이터 제대로 필터링 되는지 확인
3. Pagination: 페이지 버튼 클릭 시 테스트
    - 페이지 버튼 '1' 클릭 시 prev button disabled 확인
    - 페이지 버튼 '3' 클릭 시 prev, next button enabled 확인
    - 페이지 버튼 '6' 클릭 시 next button disabled 확인

## 기타

### prettier 모듈 import 순서 정리

강사님께서 과제 피드백 때 말씀하신 부분 - 모듈 import 순서 정리하였습니다. 

# troubleshooting

### 필터링, 정렬, 검색 관련 정보 url parameter 전달 관련

- 문제: 새로고침 시 url parameter가 사라짐
- 원인: pagination 컴포넌트에서 useEffect() 로 setParams 하여 기존 url parameter 가 사라지는 문제였음.
- 해결: useEffect 를 없애고 PageButton onClick 함수에서 setParams 하도록 수정
- [해결코드](https://github.com/pre-onboarding-internship-team2/pre-onboarding-9th-4-2/commit/10374ecc3a0628c5497b704e246f052f7fa8bfa4)

### `asyncUtilTimeout` 옵션 지정

- 문제: 테이블 데이터를 렌더링 하는 `Admin` 컴포넌트에서 `screen.debug()` 했을 시, `isLoading` if문에 걸린 `Skeleton` 컴포넌트만이 렌더링이 되어 테스트를 진행할 수 없었음
- 원인:  `waitfor`의 `timeout` 옵션의 default 값이 1000ms(1초)임. ([참고](https://github.com/testing-library/react-testing-library/issues/899))  fetch 하는데 걸리는 시간이 1초보다 길다보니, `waitfor`을 해도 테스트 코드에서는 데이터가 fetch 되지 않는 문제가 발생했던게 아닐까 싶습니다.
- 해결: 데이터 fetch 시간 고려하여 `asyncUtilTimeout` 옵션을 5초로 지정
- 참고: global 하게 `timeout` 옵션을 설정하고자 vitest setup.ts 파일에서 `configure` 로 설정

## 시연 영상 🎦

https://user-images.githubusercontent.com/87600354/227128240-2a65ce46-4225-4460-85df-b5d4d5918d84.mov

https://user-images.githubusercontent.com/87600354/227128262-4718ef2f-ba42-440e-b83b-1c5d18471dc0.mov

https://user-images.githubusercontent.com/87600354/227128283-6bf448b6-6305-4d4e-93a7-0836a7e6cb3f.mov

## 팀원 구성표 👨‍💻👩‍💻

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/jiyeon2">
      <img src="https://avatars.githubusercontent.com/u/18395475?v=4" width="100px;" alt=""/>
      <br />
      <sub><b>이지연</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ggsno">
      <img src="https://avatars.githubusercontent.com/u/46833758?v=4" width="100px;" alt=""/>
      <br />
      <sub><b>오강산</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/yses9296">
      <img src="https://avatars.githubusercontent.com/u/54027716?v=4" width="100px;" alt=""/>
      <br />
      <sub><b>최은서</b></sub>
      </a>
    </td>
        <td align="center">
      <a href="https://github.com/tjswo2292">
      <img src="https://avatars.githubusercontent.com/u/55657931?v=4" width="100px;" alt=""/>
      <br />
      <sub><b>최선재</b></sub>
      </a>
    </td>
</tr>
<tr>
    <td align="center">
      <a href="https://github.com/jiwonmik">
      <img src="https://avatars.githubusercontent.com/u/59993029?v=4" width="100px;" alt=""/>
      <br />
      <sub><b>김지원</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/onezeun">
      <img src="https://avatars.githubusercontent.com/u/78632052?v=4" width="100px;" alt=""/>
      <br />
      <sub><b>한지은</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/iuesver">
      <img src="https://avatars.githubusercontent.com/u/87600354?v=4" width="100px;" alt=""/>
      <br />
      <sub><b>오혁상</b></sub>
      </a>
    </td>
      <td align="center">
      <a href="https://github.com/junseokoh-hub">
      <img src="https://avatars.githubusercontent.com/u/99642719?v=4" width="100px;" alt=""/>
      <br />
      <sub><b>오준석</b></sub>
      </a>
    </td>

  </tr>
</table>

## commit convention 📝

| Tag Name | Description |
| --- | --- |
| feat | 새로운 기능 추가 |
| design | UI style 변경 |
| refactor | 코드 리팩토링 |
| fix | 에러, 버그 수정 |
| docs | 문서수정 |
| chores | 기타 수정사항 |

# 협업 방식 👥

## 커뮤니케이션 툴

- 노션([회의록](https://www.notion.so/2da78bd48750440292898f3157a0021b))
- 디스코드
- 깃헙 팀 레포지토리의 PR 코멘트, 커밋메시지

## 과제 수행 방식

1. 기업과제 요구사항 6가지를 이슈 6가지로 할당
    - 기업과제 전체를 한번에 리뷰하기에는 범위가 커서 요구사항 단위로 작업하고 공유하기로 결정함
2. 프로젝트 진행 규칙을 세우고 각자의 브랜치에서 이슈 단위로 작업 진행
    
    ```
    # **팀 repository 에 PR 방법
    1. organization repository에 각자의 이름으로 branch 생성 및 main branch를 개인 개정의 repository로 fork
    2. 각자의 fork된 개인 개정의 repository에서 기능(이슈)단위의 branch 생성 및 구현
    3. organization repository에 각자의 이름 branch에 기능(이슈)단위로 PR 및 merge
    4. 최종 제출 직전에 토론으로 하나의 branch만 main branch로 merge
    5. 나머지 branch들은 삭제 (PR만 남아있게끔)**
    ```
    
3. 이슈마다 PR를 생성하여 자신의 코드에 대한 설명을 남기고 팀원들의 코드를 리뷰
    - PR 내용과 브랜치의 커밋으로 팀원의 작업상황을 확인
4. 디스코드에서 회의를 진행하여 본인의 작업물, 경과, 고민점 등을 공유
    - 자신의 코드를 설명하고 Best Practice에 대한 의견 교환 및 소통하는 연습 🤗
5. 디스코드 회의 이후 다른 팀원의 코드와 작업방식, PR에서 받은 코멘트를 참고하여 자신의 프로젝트를 개선
6. 마지막에 팀원끼리 투표를 진행하여 과제로 제출할 코드 선정
