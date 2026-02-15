export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div>
      <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>
        Prev
      </button>

      <span> Page {page + 1} of {totalPages} </span>

      <button disabled={page === totalPages - 1}
              onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  );
}
