import { Plugin } from "../../application";
import {
  AiotMonitorBlock,
  ChartTemplate,
  ClassicFrame,
  ClassicFrame5,
  EmploymentCreditMng,
  Header1,
  Header5,
  HeaderMenu,
  KeyPersonArrived,
  LaborAttendance,
  ProjectAttendanceAnaTable,
  ProjectAttendanceDataAna,
  ProjectBudget,
  ProjectDesc,
  ProjectSelect,
  QuarterSelect,
  SmartHelmet,
  UnprocessedWarningList,
} from "../../schema-component/widgets";
import {
  DashboardRootPreview,
  PositionDecoratorPreview,
} from "@/schema-component/components";

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
