import React from "react";

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
    const enteredInput = formData.get("search");
    if (!enteredInput) {
      return;
    }
    searchParams.set("search", enteredInput as string);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <input
        type="text"
        name="search"
        defaultValue={searchParams.get("search") as string}
      />
      <button>검색</button>
    </form>
  );
};

export default TableSearchForm;
