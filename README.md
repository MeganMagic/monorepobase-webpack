# Monorepo Project Base - Webpack Module Federation

## 모노레포 구현 도구

### webpack

- module federation 이용 ([문서](https://webpack.js.org/concepts/module-federation))
- remote module을 runtime에 호출, 번들 사이즈 감소
- 각각 패키지를 Create React App으로 생성, Craco로 webpack 설정 수정

### pnpm workspace

- 모노레포 환경 구성 ([문서](https://pnpm.io/workspaces))
- 패키지 간 의존성 관리
- 전체 프로젝트 스크립트 관리

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

1. 모든 패키지 동시 실행
    - remote 모듈이 config에 입력한 주소에 hosting 되어있어야 함
    ```bash
    pnpm dev
    # original script: pnpm -r dev
    ```
2. 특정 패키지 실행
    ```bash
    pnpm launcher dev
    # original script: pnpm -F <package-name> dev
    ```


<br/>

## Future Task
- Type 파일 import 안됨
  - @typescript/module-federation 라이브러리 검토
- CRA Deprecated
  - react 공식문서 기준.
  - next.js, remix 등의 프레임워크 사용 권장
  - 프레임워크 없이 구성할 경우 vite, parcel 등의 번들러를 추천

<br/>

## 참고자료

- https://maxkim-j.github.io/posts/module-federation-concepts/
