import { ArrowUpOutlined, DeleteOutlined } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { css } from "@emotion/css";
import { useFieldSchema } from "@formily/react";
import { Popconfirm } from "antd";
import { FC, memo, useMemo } from "react";
import { useInsertSchemaComponent } from "../../hooks";
import { dispatchInsert } from "../DashboardRoot/utils";
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
  const { saveRemoteFieldSchema, reset } = useInsertSchemaComponent();
  const { rootFieldSchema, scale } = useDashboardRoot();
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
      <SchemaDeleteIcon>
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
