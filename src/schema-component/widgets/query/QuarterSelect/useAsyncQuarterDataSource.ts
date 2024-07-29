export function useAsyncQuarterDataSource(cur) {
  return (field) => {
    if (field?.componentProps?.defaultCurrentQuarter && cur) {
      field.value = cur
    }
  }
}
