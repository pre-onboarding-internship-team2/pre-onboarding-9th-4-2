import React from "react";
import classes from "./TableSearchForm.module.css";
import ShareButton from "../common/ShareButton";

interface TableSearchFormProps {
  searchParams: URLSearchParams;
  setSearchParams: any;
}

const TableSearchForm = ({
  searchParams,
  setSearchParams,
}: TableSearchFormProps) => {
  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const enteredInput = formData.get("search") as string;

    if (!enteredInput) {
      return;
    }

    searchParams.set("search", enteredInput as string);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const resetSearchHandler = () => {
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return (
    <form className={classes.search_form} onSubmit={searchSubmitHandler}>
      <input
        type="text"
        name="search"
        defaultValue={searchParams.get("search") || ""}
      />
      <ShareButton type="submit">검색</ShareButton>
      <ShareButton type="button" onClick={resetSearchHandler}>
        검색 초기화
      </ShareButton>
      <ShareButton
        type="button"
        name="reset-all"
        onClick={() => setSearchParams({})}
      >
        전체 리셋
      </ShareButton>
    </form>
  );
};

export default TableSearchForm;
