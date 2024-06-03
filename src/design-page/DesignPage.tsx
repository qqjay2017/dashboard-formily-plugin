import { useParams } from "react-router-dom";
import { APiWrap, useRequest } from "../api-client";
import { DashboardItem } from "../demo/types";
import { get } from "lodash-es";
import { css } from "@emotion/css";
import { useContext, useEffect, useRef, useState } from "react";
import { SchemaOptionsContext } from "@formily/react";
import { SchemaComponent } from "../schema-component/core";
import { useAppSpin } from "../application";
import { DesignPageConext } from "./context";
import { CanvasSetting } from "./CanvasSetting";

export const DesignPage = () => {
  const { id } = useParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [designZoom, setDesignZoom] = useState(0.5);
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

  useEffect(() => {
    if (!scrollAreaRef.current) {
      return;
    }
    scrollAreaRef.current.scrollTop = 650;
    scrollAreaRef.current.scrollLeft = 1900;
  }, []);

  return (
    <DesignPageConext.Provider
      value={{
        designZoom,
        setDesignZoom,
      }}
    >
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
            {/* 可视化大屏搭建 */}
          </div>
          <div>保存</div>
        </div>
        <div
          className={css`
            height: calc(100vh - 50px);
            width: calc(100vw);
            position: relative;
            display: flex;
            overflow: hidden;
          `}
        >
          <div
            className={css`
              height: 100%;
              width: 300px;
              position: relative;
              overflow: hidden;
            `}
          >
            左边
          </div>
          <div
            className={css`
              height: calc(100%);
              width: calc(100% - 600px);
              position: relative;
              overflow: hidden;

              /*  */
              background-color: #18181c;
              background-image: linear-gradient(#18181c 14px, transparent 0),
                linear-gradient(90deg, transparent 14px, #86909c 0);
              background-size: 15px 15px, 15px 15px;
            `}
          >
            {/* 画布滚动容器 */}
            <div
              ref={scrollAreaRef}
              className={css`
                user-select: none;
                height: calc(100% - 40px);
                width: 100%;
                position: relative;
                overflow: auto;
                scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
                scrollbar-width: thin;
                /*  */
              `}
            >
              {/* 最大的画布 */}
              <div
                className={css`
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 2160px;
                  width: 3840px;
                `}
              >
                {/* 居中定位 */}
                <div
                  className={css`
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform-origin: 50% 0;
                    transform: translateY(-50%);
                  `}
                >
                  <div
                    className={css`
                      pointer-events: auto;
                      list-style: none;
                    `}
                  >
                    <div
                      className={css`
                        overflow: hidden;
                        box-shadow: 0 8px 10px #1e1e1e1f;
                        width: ${1920 * designZoom}px;
                        height: ${1080 * designZoom}px;
                      `}
                    >
                      <div
                        className={css`
                          width: 1920px;
                          height: 1080px;
                          transform: scale(${designZoom});
                          border-color: #373739;
                          transition: all 0.4s;
                          position: relative;
                          transform-origin: left top;
                          background-size: cover;
                          overflow: hidden;
                        `}
                      >
                        {!schema || isLoading ? (
                          render()
                        ) : (
                          <SchemaComponent
                            components={options.components}
                            scope={options.scope}
                            schema={JSON.parse(schema)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CanvasSetting />
          </div>

          <div
            className={css`
              height: 100%;
              width: 300px;
              position: relative;
              overflow: hidden;
            `}
          ></div>
        </div>
      </div>
    </DesignPageConext.Provider>
  );
};
