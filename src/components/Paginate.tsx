import { ReactElement } from "react";
import ReactPaginate from "react-paginate";

type PaginateProps = {
  pagesCount?: number;
  previousLabel?: ReactElement;
  nextLabel?: ReactElement;
  onPageChange: (page: number) => void;
  initialPage: number;
};

const Paginate = ({
  pagesCount,
  previousLabel,
  nextLabel,
  onPageChange,
  initialPage,
}: PaginateProps) => {
  return (
    <ReactPaginate
      pageCount={pagesCount || 0}
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      // initialPage={initialPage}
      containerClassName="d-flex gap-2 align-items-center"
      pageClassName="fw-bold shadow-sm py-2 px-3 rounded"
      activeClassName="bg-primary text-white"
      disabledClassName="text-muted cursor-not-allowed"
      previousLinkClassName="btn btn-outline-success fw-bold py-2 px-3 rounded"
      nextLinkClassName="btn btn-outline-success fw-bold py-2 px-3 rounded"
    />
  );
};

export default Paginate;
