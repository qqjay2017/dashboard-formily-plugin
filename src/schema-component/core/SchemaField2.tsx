import type { ISchema, SchemaKey } from "@formily/react";
import { RecursionField, Schema, SchemaOptionsContext } from "@formily/react";
import React, { useContext } from "react";
import { ConfigProvider, Slider } from "antd";
import {
  ArrayItems,
  ArrayTable,
  DatePicker,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  Radio,
  Select,
  Space,
  Switch,
  TimePicker,
} from "@formily/antd-v5";
import type { JSXComponent } from "../types";
import { SchemaComponentOptions } from "./SchemaComponentOptions";
import {
  ApiBaseNameFormItem,
  ApiGroupFormItem,
  ApiHeadersFormItem,
  ApiOriginFormItem,
  BackgroundImageInput,
  BackgroundStyleSetter,
  BorderRadiusStyleSetter,
  BorderStyleSetter,
  BoxShadowStyleSetter,
  BoxStyleSetter,
  CollapseItem,
  ColorInput,
  ColorTypeSelect,
  CornerInput,
  DataSourceBind,
  DecoratorPaddingFormItem,
  DepFieldSetFormItem,
  DesignWidthEnumSelect,
  DisplayStyleSetter,
  DrawerSetter,
  FlexStyleSetter,
  FontStyleSetter,
  ImageInput,
  IsDarkThemeSelect,
  JsonInput,
  PositionDecoratorFormItem,
  PositionInput,
  SizeInput,
  ValueInput,
} from "@/designable/react-settings-form/components";

export interface ISchemaFieldProps {
  schema?: ISchema;
  components?: {
    [key: string]: JSXComponent;
  };
  scope?: any;
  name?: SchemaKey;
  children?: React.ReactNode;
}

export function SchemaField2(props: ISchemaFieldProps) {
  const schema = Schema.isSchemaInstance(props.schema)
    ? props.schema
    : new Schema({
        type: "object",
        ...props.schema,
      });
  const renderChildren = () => {
    return <RecursionField {...props} schema={schema} />;
  };
  const { locale } = useContext(ConfigProvider.ConfigContext);

  const options = useContext(SchemaOptionsContext);

  return (
    <SchemaComponentOptions
      inherit
      scope={{
        ...options?.scope,
        ...props.scope,
      }}
      components={{
        FormItem,
        CollapseItem,
        Input,
        ValueInput,
        SizeInput,
        ColorInput,
        ImageInput,

        PositionInput,
        CornerInput,
        BackgroundImageInput,
        BackgroundStyleSetter,
        BoxStyleSetter,
        BorderStyleSetter,
        BorderRadiusStyleSetter,
        DisplayStyleSetter,
        BoxShadowStyleSetter,
        FlexStyleSetter,
        FontStyleSetter,
        DrawerSetter,
        NumberPicker,
        DatePicker,
        TimePicker,
        Select,
        Radio,
        Slider,
        Switch,
        Space,
        ArrayItems,
        ArrayTable,
        FormCollapse,
        FormGrid,
        FormLayout,
        FormTab,
        IsDarkThemeSelect,
        ColorTypeSelect,
        PositionDecoratorFormItem,
        JsonInput,
        DepFieldSetFormItem,
        DecoratorPaddingFormItem,
        ApiBaseNameFormItem,
        ApiGroupFormItem,
        ApiHeadersFormItem,
        ApiOriginFormItem,
        DesignWidthEnumSelect,
        DataSourceBind,

        ...options?.components,
        ...props.components,
      }}
    >
      <ConfigProvider locale={locale}>{renderChildren()}</ConfigProvider>
    </SchemaComponentOptions>
  );
}
