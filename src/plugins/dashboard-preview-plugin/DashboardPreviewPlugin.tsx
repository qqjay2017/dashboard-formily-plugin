import { Plugin } from "../../application";
import {
  ClassicFrame,
  Header1,
  ProjectBudget,
  ProjectTypePercent,
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
    });
  }
}
