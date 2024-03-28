# Monorepo Project Base - Webpack Module Federation

## 모노레포 구현 도구

### webpack

- module federation 이용 ([문서](https://webpack.js.org/concepts/module-federation))
- remote module을 runtime에 호출, 번들 사이즈 감소
- 각각 패키지를 Create React App으로 생성, Craco로 webpack 설정 수정

### pnpm workspace

- 모노레포 환경 구성 ([문서](https://pnpm.io/workspaces))
- 패키지 간 동일한 의존성 버전 사용하도록 설정 가능

<br />

## 패키지 공유/참조 방법

### Package 공유

1. filename, exposes 설정

   ```js
   plugins: [
     new ModuleFederationPlugin({
       name: "package1",
       filename: "remoteEntry.js",
       exposes: { // 내보낼 패키지 이름 및 경로 설정
         "./App": "./src/App", // import App from "package1/App"
       },
       // ...
     }),
   ],
   ```

2. shared(공유 의존성) 설정

   - shared에 특정 의존성과 버전을 넘기면 패키지 간 의존성을 런타임에 공유

   ```js
   plugins: [
     new ModuleFederationPlugin({
       // ...
       shared: {
         // react를 공유 모듈로 추가
         react: {
           requiredVersion: deps.react,
           singleton: true,
           shareScope: 'default'
         },
       },
     }),
   ],
   ```

### Package 참조

- remotes(참조 위치) 설정

  - remotes에 명시한 후 App에서 import 가능

  ```js
  plugins: [
    new ModuleFederationPlugin({
      name: "app",
      remotes: {
        package1: "package1@http://www.package1.com/remoteEntry.js",
      },
      // ...
    }),
  ],
  ```

<br/>

## 프로젝트 실행방법

1. remote 프로젝트 실행

- 참조하는 패키지들이 런처에 작성한 위치에 호스팅 되어야 함
  ```bash
  # packages/ui-internal
  pnpm run start
  # packages/app1-remote
  pnpm run start
  # packages/app2-remote
  ```

2. host 프로젝트 실행
   ```bash
   # packages/launcher
   pnpm run start
   ```

<br/>

## 한계

- 각 프로젝트 별도로 실행
- Type safe하게 관리하기 어려움
- CRA Deprecated
  - react 공식문서 기준.
  - next.js, remix 등의 프레임워크 사용 권장
  - 프레임워크 없이 구성할 경우 vite, parcel 등의 번들러를 추천

## 대안

### Lerna

- javascript 모노레포 관리 도구, 사용자 많음
- 패키지 간 의존성, 종속성 관리
- 하위 패키지 동시 실행, 동시 빌드 등 가능

### nx

- 범용적인 모노레포 관리 도구
- 빌드 캐시
- rich ecosystem
- 제공 기능, 템플릿 많음
- 러닝 커브, 너무 많은 캡슐화

### turbo

- vercel 제공 monorepo 관리 도구
- 세팅이 간편함
- 자료 부족

## 참고자료

- https://maxkim-j.github.io/posts/module-federation-concepts/
