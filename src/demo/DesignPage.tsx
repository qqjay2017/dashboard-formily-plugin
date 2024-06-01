import { useParams } from "react-router-dom";
import { APiWrap, useRequest } from "../api-client";
import { DashboardItem } from "./types";
import { get } from "lodash-es";
import { css } from "@emotion/css";
import { useContext } from "react";
import { SchemaOptionsContext } from "@formily/react";
import { SchemaComponent } from "../schema-component/core";
import { useAppSpin } from "../application";

export const DesignPage = () => {
  const { id } = useParams();
  const { render } = useAppSpin();
  const options = useContext(SchemaOptionsContext);
  const { data, isLoading } = useRequest<APiWrap<DashboardItem>>(
    `/huang-api/dashboard/${id}`,
    {
      method: "GET",
      refreshDeps: [id],
    }
  );
  const schema = get(data, "data.data.content", "");

  if (!schema || isLoading) {
    return render();
  }

  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      <div
        className={css`
          width: 100%;
          height: 50px;
          background-color: #fff;
          border-bottom: 1px solid #e4e4e5;
          box-sizing: border-box;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          className={css`
            cursor: pointer;
            height: 40px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            color: #2f2e3f;
            line-height: 40px;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 230px;
          `}
        >
          可视化大屏搭建
        </div>
        <div></div>
      </div>
      <div
        className={css`
          height: calc(100vh - 50px);
          width: 100vw;
          display: flex;
          min-height: 700px;
        `}
      >
        <div
          className={css`
            height: calc(100vh - 50px);
            width: calc(100vw - 300px);
            display: flex;
            min-height: 700px;
          `}
        >
          <SchemaComponent
            components={options.components}
            scope={options.scope}
            schema={JSON.parse(schema)}
          />
        </div>
        <div
          className={css`
            height: calc(100vh - 50px);
            width: 300px;
            display: flex;
            min-height: 700px;
            border-left: 1px solid #d9d9d9;
          `}
        >
          2
        </div>
      </div>
    </div>
  );
};
