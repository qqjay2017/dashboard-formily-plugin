import { Plugin } from "../../application";
import {
  ClassicFrame,
  Header1,
  ProjectBudget,
  Statistic,
} from "../../schema-component";
import { DashboardRootPreview } from "../../schema-component/components/DashboardRoot/DashboardRootPreview";
import { PositionDecoratorPreview } from "../../schema-component/components/PositionDecorator/PositionDecoratorPreview";
export class DashboardPreviewPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      PositionDecorator: PositionDecoratorPreview,
      DashboardRoot: DashboardRootPreview,
      ClassicFrame,
      Statistic,
      Header1,
      ProjectBudget,
    });
  }
}
