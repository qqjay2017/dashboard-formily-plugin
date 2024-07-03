import { Plugin } from "../../application";
import {
  ClassicFrame,
  ConstrucPersonChart,
  Header1,
  HeaderMenu,
  ProjectAttendanceAnaTable,
  ProjectAttendanceDataAna,
  ProjectBudget,
  ProjectTypePercent,
  QuarterSelect,
  Statistic,
} from "../../schema-component";

export class DashboardPreviewPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      ClassicFrame,
      Statistic,
      Header1,
      ProjectBudget,
      ProjectTypePercent,
      HeaderMenu,
      ConstrucPersonChart,
      ProjectAttendanceDataAna,
      ProjectAttendanceAnaTable,
      QuarterSelect,
    });
  }
}
