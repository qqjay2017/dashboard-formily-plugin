import type { ISchemaComponentOptionsProps } from "@/schema-component/components/SchemaComponentOptions";
import SchemaComponentOptions from "@/schema-component/components/SchemaComponentOptions";

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
} from "@/schema-component/widgets";
import DashboardRootPreview from "@/schema-component/components/DashboardRootPreview";
import PositionDecoratorPreview from "@/schema-component/components/PositionDecorator";
import Weighbridge from "@/schema-component/widgets/zhdg/weighbridge";
import DeviationOfCargo from "@/schema-component/widgets/zhdg/deviation-of-cargo";

interface IPreviewSchemaComponentProps extends ISchemaComponentOptionsProps {}

export default function PreviewSchemaComponent({
  scope,
  components,
  children,
}: IPreviewSchemaComponentProps) {
  return (
    <SchemaComponentOptions
      scope={{
        ...scope,
      }}
      components={{
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
        DashboardRootPreview,
        PositionDecorator: PositionDecoratorPreview,
        PositionDecoratorPreview,
        Weighbridge,
        DeviationOfCargo,
        ...components,
      }}
    >
      {children}
    </SchemaComponentOptions>
  );
}
