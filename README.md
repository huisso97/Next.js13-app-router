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
  - /dashboard
    - page.tsx
  - /(auth)
    - /login
      - page.tsx
    - /signUp
      - page.tsx
```

- (folder): url에는 표기가 안되지만 프로젝트 내부 폴더 구조로서 유관한 라우터들을 wrapping할 수 있다.

app 폴더 내에 생성된 경로들은 모두 Server Component이므로, console.log()의 로그들이 보이지 않는다. 그래서 만약 CSR을 하기 위해서는 상단에 `use client`를 명시해야한다.

### 언제 `use client`를 사용해야햘까?

#### Server Components

With Server Components, the initial page load is faster, and the client-side JavaScript bundle size is reduced.
To make the transition to Server Components easier, all components inside the App Router are Server Components by default, including special files and colocated components. This allows you to automatically adopt them with no extra work, and achieve great performance out of the box. You can also optionally opt-in to Client Components using the 'use client' directive.

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
