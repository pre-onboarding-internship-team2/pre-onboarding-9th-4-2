import React, { useRef } from "react";
import useQueryString from "../hooks/useQueryString";
import { AiOutlineCloseCircle } from "react-icons/ai";

export function CustomerNameFilter() {
  const {
    params: { customerName },
    setQueryParams,
    deleteQueryParams,
  } = useQueryString();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!inputRef.current) return;

    const customerName = inputRef.current.value.trim().toLocaleLowerCase();
    if (!customerName) return;

    setQueryParams({ customerName });
    inputRef.current.value = "";
  };

  const resetCustomerNameQuery = () => {
    deleteQueryParams(["customerName"]);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          고객이름으로 찾기
          <input
            ref={inputRef}
            name="customerName"
            placeholder="고객이름을 입력해주세요"
          />
        </label>
        <button type="submit">검색</button>
      </form>

      {customerName && (
        <div>
          <span>검색한 고객이름 : {customerName}</span>
          <button onClick={resetCustomerNameQuery}>
            해제
            <AiOutlineCloseCircle />
          </button>
        </div>
      )}
    </div>
  );
}
