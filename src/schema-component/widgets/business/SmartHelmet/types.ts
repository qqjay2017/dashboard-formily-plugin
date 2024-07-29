export interface SafetyProjectType {
  //   应用项目数
  applicationItemNum: number
  // 监测人员数
  monitoringPersonnelNum: number
  // 上个季度 应用项目数
  previousApplicationItemNum: number
  // 上个季度 监测人员数
  previousMonitoringPersonnelNum: number
  //   应用项目数 同比增长
  applicationRate: string
  //  监测人员数 同比增长
  monitoringRate: string
}

export interface ApplicationAnalysiItem {
  index: number
  projectName: string
  rate: string
}
