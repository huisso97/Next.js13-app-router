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

![info](./img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-05-21%2020.35.52.png)
[출처 : https://nextjs.org/docs/getting-started/react-essentials]
