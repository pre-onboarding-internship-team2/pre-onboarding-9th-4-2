import { Suspense } from "react";
import OrderTable from "./components/OrderTable";

function App() {
  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <OrderTable />
      </Suspense>
    </>
  );
}

export default App;
