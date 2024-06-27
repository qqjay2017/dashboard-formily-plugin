import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { css } from "@emotion/css";
import { useField, useFieldSchema } from "@formily/react";
import { Popconfirm } from "antd";
import { FC, memo } from "react";
import { useInsertSchemaComponent, useSaveAllFieldSchema } from "../../hooks";
import {
  dispatchFieldSchemaChange,
  dispatchInsert,
} from "../DashboardRoot/utils";
import { useDashboardRoot } from "../DashboardRoot";

const iconStyle = { cursor: "pointer", fontSize: 12, color: "#fff" };

export interface SchemaSettingsIconProps extends AntdIconProps {
  // options: SchemaSettingOptions;
}

export const SchemaDeleteIcon: FC<SchemaSettingsIconProps> = memo(
  ({ onClick, children }) => {
    return (
      <div
        onClick={onClick}
        className={css`
          cursor: pointer;
          width: 16px;
          height: 16px;
          background-color: var(--colorSettings);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 4px;
        `}
      >
        {children}
      </div>
    );
  }
);

export const PositionContextMenu = () => {
  const { saveLocalFieldState } = useSaveAllFieldSchema();
  const { saveRemoteFieldSchema, reset } = useInsertSchemaComponent();
  const { rootFieldSchema, scale } = useDashboardRoot();
  const field = useField();
  const fieldSchema = useFieldSchema();
  const confirm = (e) => {
    // 执行删除操作

    const fieldSchemaParent = fieldSchema.parent
      ? fieldSchema.parent
      : rootFieldSchema;

    fieldSchemaParent.removeProperty(fieldSchema.name);

    saveRemoteFieldSchema(rootFieldSchema).then(() => {
      reset && reset();
      dispatchInsert();
    });
  };

  const handleSetTop = () => {
    const fieldSchemaParent = fieldSchema.parent
      ? fieldSchema.parent
      : rootFieldSchema;

    const maxZIndex = fieldSchemaParent.reduceProperties((memo, cur) => {
      const curZIndex = cur["x-decorator-props"].zIndex || 0;
      if (curZIndex > memo) {
        memo = cur["x-decorator-props"].zIndex;
      }
      return memo;
    }, 0);

    saveLocalFieldState({
      address: field.address.toString(),
      schema: {
        "x-decorator-props": {
          zIndex: maxZIndex + 1,
        },
      },
    });
    saveRemoteFieldSchema(rootFieldSchema).then(() => {
      dispatchFieldSchemaChange();
    });
  };

  const handleSetDown = () => {
    const curZIndex = fieldSchema["x-decorator-props"].zIndex || 1;

    saveLocalFieldState({
      address: field.address.toString(),
      schema: {
        "x-decorator-props": {
          zIndex: curZIndex - 1,
        },
      },
    });
    saveRemoteFieldSchema(rootFieldSchema).then(() => {
      dispatchFieldSchemaChange();
    });
  };

  return (
    <div
      className={css`
        position: absolute;
        right: 0px;
        top: 4px;
        z-index: 9999;
        width: 60px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        transform: scale(${1 / scale});
        transform-origin: right top;
      `}
    >
      <SchemaDeleteIcon
        onClick={() => {
          handleSetDown();
        }}
      >
        <ArrowDownOutlined role="button" style={iconStyle} />
      </SchemaDeleteIcon>
      <SchemaDeleteIcon
        onClick={() => {
          handleSetTop();
        }}
      >
        <ArrowUpOutlined role="button" style={iconStyle} />
      </SchemaDeleteIcon>
      <SchemaDeleteIcon>
        <Popconfirm
          title="是否确认删除?"
          okText="确认"
          cancelText="取消"
          onConfirm={confirm}
        >
          <DeleteOutlined role="button" style={iconStyle} />
        </Popconfirm>
      </SchemaDeleteIcon>
    </div>
  );
};
