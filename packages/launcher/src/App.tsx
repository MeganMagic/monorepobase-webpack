import { Suspense, lazy } from "react";

// @ts-ignore
const App1 = lazy(() => import("app1/App"));
// @ts-ignore
const App2 = lazy(() => import("app2/App"));

function App() {
  return (
    <div className="container">
      <h1>Launcher</h1>
      <h3 className="mb-8">
        This is launcher application. Launcher wraps other applications.
      </h3>

      <div className="app-container">
        <Suspense fallback={<div>loading...</div>}>
          <App1 />
          <App2 />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
