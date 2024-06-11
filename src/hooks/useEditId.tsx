import { useSearchParams } from "react-router-dom";

export const useEditId = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get("id");
};
