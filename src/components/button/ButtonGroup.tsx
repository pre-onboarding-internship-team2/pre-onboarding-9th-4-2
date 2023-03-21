import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../functions/fetcher";
import { totalPageNumber } from "../../functions/pagination";

const ButtonGroup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useSWR("/", fetcher);
  return (
    <div className="btn-group my-6">
      {data &&
        Array.from(
          {
            length: totalPageNumber(
              data,
              searchParams.get("keyword") ? searchParams.get("keyword") : null
            ),
          },
          (v, i) => (
            <button
              className="btn"
              key={i + 1}
              onClick={() => {
                searchParams.set("page", String(i + 1));
                setSearchParams(searchParams);
              }}
            >
              {i + 1}
            </button>
          )
        )}
    </div>
  );
};

export default ButtonGroup;
