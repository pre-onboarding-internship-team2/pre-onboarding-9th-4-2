import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../functions/fetcher";
import TextInput from "../components/input/TextInput";
import TableHead from "../components/table/TableHead";
import TableBody from "../components/table/TableBody";
import ButtonGroup from "../components/button/ButtonGroup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const { error, isValidating } = useSWR("/", fetcher, {
    refreshInterval: 5000,
  });

  const notify = () =>
    toast.success("데이터가 업데이트 되었습니다.", { autoClose: 1000 });

  useEffect(() => {
    if (isValidating) {
      notify();
    }
  }, [isValidating]);

  if (error) {
    return <div>Something wrong...</div>;
  }
  return (
    <section>
      <article className="flex flex-col items-center">
        <h1 className="text-4xl font-bold my-6">스위치원 주문 목록표</h1>
        <TextInput />
        <table className="table w-3/4 shadow-lg">
          <TableHead />
          <TableBody />
        </table>
        <ButtonGroup />
      </article>
      <ToastContainer />
    </section>
  );
};

export default MainPage;
