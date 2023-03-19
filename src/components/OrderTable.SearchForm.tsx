import { useOrderTableFunctions } from "./OrderTable.hooks";

export default function SearchForm() {
  const { filterBySearch } = useOrderTableFunctions();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formElement = e.target as HTMLFormElement;
          const inputElement = formElement[0] as HTMLInputElement;
          const { value } = inputElement;

          filterBySearch(value);
        }}
      >
        <label>
          고객이름 검색
          <input />
        </label>
        <button type="submit">검색</button>
      </form>
    </>
  );
}
