import { useSearchParams } from 'react-router-dom'

export function useEditId() {
  const [searchParams] = useSearchParams()
  return searchParams.get('id')
}
