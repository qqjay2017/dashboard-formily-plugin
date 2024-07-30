import {
  ExpressionScope,
  SchemaComponentsContext,
  SchemaOptionsContext,
} from "@formily/react";
import React, { memo, useMemo } from "react";
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

import { Slider } from "antd";
import type { ISchemaComponentOptionsProps } from "../types";
import { useSchemaOptionsContext } from "./useSchemaOptionsContext";
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

export const SchemaComponentOptions: React.FC<ISchemaComponentOptionsProps> =
  memo((props) => {
    const { children } = props;
    const options = useSchemaOptionsContext();
    const components = useMemo(() => {
      return { ...options.components, ...props.components };
    }, [options.components, props.components]);

    const scope = useMemo(() => {
      return { ...options.scope, ...props.scope };
    }, [options.scope, props.scope]);

    const schemaOptionsContextValue = useMemo(() => {
      return { scope, components };
    }, [scope, components]);

    return (
      <SchemaOptionsContext.Provider value={schemaOptionsContextValue}>
        <SchemaComponentsContext.Provider
          value={{
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
            ...components,
          }}
        >
          <ExpressionScope value={scope}>{children}</ExpressionScope>
        </SchemaComponentsContext.Provider>
      </SchemaOptionsContext.Provider>
    );
  });

SchemaComponentOptions.displayName = "SchemaComponentOptions";
