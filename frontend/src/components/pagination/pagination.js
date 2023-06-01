import React from "react";

const Pagination = ({ handlePageChange, currentPage }) => {
  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
