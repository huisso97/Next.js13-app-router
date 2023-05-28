# Repository 소개

Next.js 13을 학습하기 위해 해당 프로젝트를 시작하였다.

Next.js 문서와 NextJS App Router 강의 자료 토대로 이해한 내용들을 정리하였다.

강의 커리큘럼에 맞춰 구성하였고, 공식 문서 내용을 토대로 내용들을 추가 정리하였다.

# Next.js App Router: Learn Modern Web Development

## Chapter 1 : Routing, Server Components, Loading & Error Handling

### Routing

#### Routing in Next 12

```markdown
/pages

- index.tsx
- dashboard.tsx
```

#### Routing in Next 13

```markdown
/app

- page.tsx
/dashboard
  - page.tsx
/(auth)
  /login
    - page.tsx
	/signUp
    - page.tsx
```

- (folder): url에는 표기가 안되지만 프로젝트 내부 폴더 구조로서 유관한 라우터들을 wrapping할 수 있다.

app 폴더 내에 생성된 경로들은 모두 Server Component이므로, console.log()의 로그들이 보이지 않는다. 그래서 만약 CSR을 하기 위해서는 상단에 `use client`를 명시해야한다.

### Server Components

#### Server Components

초기 페이지 로드가 더 빠르며, 클라이언트 사이드 자바스크립트 번들 사이즈가 줄어든다.

그리고 중요한 자원들이 포함된 컴포넌트의 경우, 해당 자원들은 클라이언트에 로드된 자바스크립트 번들에 포함되지 않는다.

기본적으로 app에 설정된 라우터들은 Server Component로 되어있으며, 'use client'를 통해 클라이언트 컴포넌트를 설정할 수 있다.

#### Client Components

서버에서 pre rendering이 되어 클라이언트에서 클라이언트에서 hydrate된다.

즉 프리렌더링된 html DOM 요소 위에 JS 파일이 한 번 더 렌더링되면서 자바스크립트 코드들이 DOM 요소 위에 자기 자리를 찾아가며 매칭이 된다.

#### When to use?

##### Server Component

- 데이터 요청
- 백엔드 자원 접근
- access token, api key 와 같은 중요한 정보들은 서버에서 핸들링
- 서버에 크게 의존도를 유지해야할 경우

##### Client Component

- onClick, onChange와 같은 이벤트 리스너와 상호작용을 추가할 경우
- useState, useReducer와 같은 상태와 라이프사이클 이펙트들을 사용할 경우
- Brower API를 사용할 경우
- state, effect 혹은 브라우저 api 기반 커스텀 훅을 사용할 경우
- 리액트 클래스 컴포넌트를 사용할 경우

![info](./img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-05-21%2020.35.52.png)
[출처 : https://nextjs.org/docs/getting-started/react-essentials]

#### Pattern

어플리케이션 성능을 향상시키기 위해서는, Client 컴포넌트들을 일부로만 구성하게 한다.

예를 들어, 로고와 링크같은 정적 요소들과 상호작용이 일어나는 search bar가 있을 경우, search bar에 한해서만 <SearchBar /> 와 같은 형태로 Client 컴포넌트로 구성하고, Server 컴포넌트로 이루어진 layout에 사용한다.

```javascript
// SearchBar is a Client Component
import SearchBar from "./searchbar";
// Logo is a Server Component
import Logo from "./logo";

// Layout is a Server Component by default
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <SearchBar />
      </nav>
      <main>{children}</main>
    </>
  );
}
```

##### 미지원 pattern

위와 반대로, Client 컴포넌트에 Server 컴포넌트를 import해서는 안된다.

[출처 : https://nextjs.org/docs/getting-started/react-essentials]

### Loading

Next.js는 기본적으로 Server Component를 제공한다고 하였다.

그러면 비동기로 서버에서 데이터를 요청받을 때까지의 로딩을 어떻게 표시할 수 있을까?(우리는 useState와 같은 hook을 쓰지 못한다!)

이러한 상황을 대비하여 Next.jsd에서는 loading에 대한 스켈레톤 혹은 로딩 UI를 보여줄 파일명을 따로 지정하였다.

다음과 같이 `loading.tsx`을 추가하자.

```markdown
/app

- page.tsx
/dashboard
  - page.tsx
/(auth)
  /login
    - page.tsx
    - loading.tsx
  /signUp
    - page.tsx
```

login의 page 컴포넌트에서 비동기로 특정 데이터가 요청되는 동안, loading 페이지가 렌더링된다.

### Error

React에서는 Suspense동안 렌더링이 실패할 때, Error Boundary를 호출하여 에러를 표시한다.

`loading.tsx`처럼 `error.tsx` 컴포넌트를 만든다.

```javascript
// page.tsx

const session = null

export default function Home() {
  if (!session) throw new Error("there is error related to session")
  
  return <main>This is an auth-only page</main>
}
```

```javascript
// error.tsx
'use client'

const error = ({
  error,
  reset // redo the last code
}:{
  error : Error;
  reset : () => void
}) => {
  console.log(error.message) // there is error related to session
  return <div>error <button onClick={reset}>Try again</button></div>
  }
export default error
```

위와 같이 error 메세지에 접근이 가능하다.

좀 더 효율적으로 에러 메세지를 관리하기 위해서, 저렇게 컴포넌트마다 작성하는 것이 아닌, 모듈로 따로 관리를 해보자.

#### Error message 관리

1. `src/lib/exceptions.ts` 생성

```javascript
export class AuthRequiredError extends Error {
  constructor(message = "Auth is required to access this page.") {
    super(message)
    this.name = "AuthRequiredError"
  }
}
```

2. message를 넣어주거나 default message 활용

```javascript
// page.tsx
import {AuthRequiredError} from "@/libs/excepntions.tsx"

const session = null

export default function Home() {
  if (!session) throw new AuthRequiredError // or AuthRequiredError("hello")
  
  return <main>This is an auth-only page</main>
}
```

### Dynamic Routing

```markdown
/post
	/[postId]
  	- page.tsx
```

```javascript
// src/app/post/[postId]/page.tsx

import { FC } from 'react'

interface PageProps {
  params: {
    postId : string
  }
}

const page: FC<PageProps> = ({params}) => {
  
  return <div>{params.postId}</div>
}

export default page
```

위와 같이 우리가 설정한 동적 파라미터 변수 값을 가져올 수 있다.

#### 쿼리스트링 값 접근

`/post/1?searchQuery=hello` 와 같이 쿼리스트링이 있을 경우, 어떻게 값을 가져올 수 있을까?

동일하게 컴포넌트 내에서 props로 받는 변수에 접근이 가능하다.

![image-20230528161907992](./img/스크린샷 2023-05-28 16.18.51.png)

#### Dynamic router in dynamic router

`/shoppingItems/1/blue` url로 라우팅을 하고 싶을 때, 다음과 같이 `...`을 추가하여 모든 세그먼트에 접근 가능하도록 설정한다.

```markdown
/shoppingItems
	/[...postId]
  	- page.tsx
  
```

```javascript
// shoppingItems/[...postId]/page.tsx

const page: FC<PageProps> = (props) => {
  console.log(props)
  /*
  {
    params : ["1", "blue"],
     searchParams : {}
   }
  */    
  return <div>{props.params.postId}</div>
}

export default page

```

## Chapter 2 : Rendering for optimized page speeds

