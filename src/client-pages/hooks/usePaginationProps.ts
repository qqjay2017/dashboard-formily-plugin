import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function usePaginationProps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = Number(searchParams.get("pageNum") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const onChange = useCallback((page: number, pageSize: number) => {
    return setSearchParams((prev) => ({
      ...prev,
      pageSize,
      pageNum: page,
    }));
  }, []);
  return {
    pageSize,
    current,
    pageNum: current,
    setPageSize: useCallback((pageSize: number) => {
      return setSearchParams((prev) => ({
        ...prev,
        pageSize,
      }));
    }, []),
    setPageNum: useCallback((page: number) => {
      return setSearchParams((prev) => ({
        ...prev,

        pageNum: page,
      }));
    }, []),
    onChange,
    paginationProps: { onChange, current, pageSize },
  };
}
