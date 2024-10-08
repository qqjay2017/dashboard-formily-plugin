import { createSchemaField } from "@formily/react";
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
import { Card, Slider } from "antd";

import type { FC } from "react";
import ReactionsSetter from "../setters/ReactionsSetter";
import {
  ApiBaseNameFormItem,
  ApiGroupFormItem,
  ApiOriginFormItem,
  BackgroundImageInput,
  BackgroundStyleSetter,
  BorderRadiusStyleSetter,
  BoxShadowStyleSetter,
  BoxStyleSetter,
  CollapseItem,
  ColorInput,
  ColorTypeSelect,
  ColorTypeSelect2,
  CornerInput,
  DecoratorPaddingFormItem,
  DepFieldSetFormItem,
  DrawerSetter,
  FlexStyleSetter,
  FontStyleSetter,
  ImageInput,
  IsDarkThemeSelect,
  PositionDecoratorFormItem,
  PositionInput,
  SizeInput,
  ValueInput,
} from "./components";
import DataSourceBind from "./components/DataSourceBind";
import JsonInput from "./components/JsonInput";
import MonacoEditor from "@/schema-component/components/MonacoEditor";

const SchemaField2: FC<any> = createSchemaField({
  components: {
    FormItem,
    CollapseItem,
    Input,
    ValueInput,
    SizeInput,
    ColorInput,
    ImageInput,
    Card,
    PositionInput,
    CornerInput,
    BackgroundImageInput,
    BackgroundStyleSetter,
    BoxStyleSetter,

    BorderRadiusStyleSetter,

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
    ColorTypeSelect2,
    PositionDecoratorFormItem,
    JsonInput,
    MonacoEditor,
    DepFieldSetFormItem,
    DecoratorPaddingFormItem,
    ApiBaseNameFormItem,
    ApiGroupFormItem,

    ApiOriginFormItem,

    DataSourceBind,
    ReactionsSetter,
  },
});

export default SchemaField2;
