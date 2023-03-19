import { Suspense } from "react";
import OrderTable from "./components/OrderTable";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  return (
    <>
      <h1>table</h1>
      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
          <OrderTable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
