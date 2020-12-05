import React, { useEffect, useState } from "react";
import { usePaginatedQuery, useQueryCache } from "react-query";
import { fetchPassengers } from "./api";

function Pagination() {
  const cache = useQueryCache();
  const [page, setPage] = useState(0);

  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(["passengers", page], fetchPassengers, {});

  useEffect(() => {
    if (latestData?.data) {
      cache.prefetchQuery(["passengers", page + 1], fetchPassengers);
    }
  }, [latestData, fetchPassengers, page]);

  return (
    <div>
      <p>
        In this example, each page of data remains visible as the next page is
        fetched. The buttons and capability to proceed to the next page are also
        supressed until the next page cursor is known. Each page is cached as a
        normal query too, so when going to previous pages, you'll see them
        instantaneously while they are also refetched invisibly in the
        background.
      </p>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {resolvedData.data.map((passanger) => (
            <p key={passanger.id}>{passanger.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() =>
          setPage((old) => (!latestData || !latestData?.data ? old : old + 1))
        }
        disabled={
          page === latestData?.totalPages || latestData?.data.length === 0
        }
      >
        Next Page
      </button>
      {isFetching ? <span>Loading...</span> : null}
    </div>
  );
}

export default Pagination;
