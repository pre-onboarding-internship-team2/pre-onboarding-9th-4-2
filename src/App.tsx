import { useQuery } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import { getCustomers } from "./api/customer-api";
import Table from "./components/Table";
import { CustomerType } from "./types/customer.types";
import { RouterProvider } from "react-router-dom";

const App = () => {
  const { data, status, error } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
    select: (value) =>
      value?.filter((item) => item.transaction_time.includes("2023-03-08")),
  });

  if (status === "loading") return <p>Loading...</p>;

  if (status === "error")
    return <p>{JSON.stringify((error as Error).message)}</p>;

  const router = createBrowserRouter([
    { path: "/", element: <Table data={data as CustomerType[]} /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
