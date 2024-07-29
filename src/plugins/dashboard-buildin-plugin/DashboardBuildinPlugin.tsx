import { Plugin } from "../../application";
import {
  AiotMonitorBlock,
  ChartTemplate,
  ClassicFrame,
  ClassicFrame5,
  DashboardRootPreview,
  EmploymentCreditMng,
  Header1,
  Header5,
  HeaderMenu,
  KeyPersonArrived,
  LaborAttendance,
  PositionDecoratorPreview,
  ProjectAttendanceAnaTable,
  ProjectAttendanceDataAna,
  ProjectBudget,
  ProjectDesc,
  ProjectSelect,
  QuarterSelect,
  SmartHelmet,
  UnprocessedWarningList,
} from "../../schema-component";

export class DashboardBuildinPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      Header1,
      Header5,
      HeaderMenu,
      LaborAttendance,
      ProjectDesc,
      EmploymentCreditMng,
      SmartHelmet,
      KeyPersonArrived,
      UnprocessedWarningList,
      ClassicFrame,
      ClassicFrame5,

      ProjectBudget,

      ProjectAttendanceDataAna,
      ProjectAttendanceAnaTable,
      QuarterSelect,
      ProjectSelect,
      ChartTemplate,
      AiotMonitorBlock,
      DashboardRoot: DashboardRootPreview,
      PositionDecorator: PositionDecoratorPreview,
    });
  }
}
