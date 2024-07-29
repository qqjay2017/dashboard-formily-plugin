export function useAsyncProjectDataSource(projectList, firstProject) {
  return (field) => {
    field.dataSource = projectList
    field.value = firstProject
  }
}
