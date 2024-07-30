export function useAsyncProjectDataSource(projectList, firstProject) {
  return (field) => {
    field.dataSource = projectList
    field.value = firstProject
    console.log(projectList, firstProject, '项目选择赋值成功')
  }
}
