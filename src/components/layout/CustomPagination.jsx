import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState(1); // Set an initial value for currentPage

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the page number from URL or default to 1
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // Function to handle page change
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
    // You may also want to update the URL using useSearchParams

    if(searchParams.has("page")) {
    searchParams.set("page", pageNumber)
    } else {
        searchParams.append("page", pageNumber)
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <div className="d-flex justify-content-center my-5">
      {filteredProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
};

export default CustomPagination;
