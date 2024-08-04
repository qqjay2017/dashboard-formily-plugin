import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { usePaginationProps } from "./usePaginationProps";

export function useTypeParam(defaultValue = "") {
  const [searchParams, setSearchParams] = useSearchParams();
  const { current, pageSize } = usePaginationProps();
  return {
    typeParam: searchParams.get("type") || defaultValue,
    setTypeParam: useCallback((type = "") => {
      return setSearchParams((prev) => ({
        ...prev,
        pageNum: 1,

        type,
      }));
    }, []),
    pageNum: current,
    pageSize,
  };
}
