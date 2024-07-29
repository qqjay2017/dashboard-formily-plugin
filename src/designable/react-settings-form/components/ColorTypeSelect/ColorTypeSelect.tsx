import { css } from "@emotion/css";
import { theme } from "antd";
import { allThemes } from "../../../../dashboard-themes";

interface ColorTypeSelectProps {
  value?: string;
  onChange?: (str?: string) => string;
}
export function ColorTypeSelect({ value, onChange }: ColorTypeSelectProps) {
  const { token } = theme.useToken();

  return (
    <div
      className={css`
        margin-left: 0px;
      `}
    >
      {allThemes.map((theme) => {
        const isActive = value === theme.name;
        return (
          <div
            onClick={() => {
              onChange && onChange(theme.name);
            }}
            key={theme.name}
            className={css`
              border-radius: 4px;
              cursor: pointer;
              padding: 12px 12px;
              margin-bottom: 16px;
              width: 100%;
              width: 180px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid ${isActive ? theme.colors[0] : "#ccc"};
            `}
          >
            <div
              className={css`
                width: 50px;
                text-align: left;
                white-space: nowrap;
                max-width: 100%;
                overflow: hidden;
                color: ${isActive ? theme.colors[0] : token.colorText};
              `}
            >
              {theme.zhName}
            </div>
            <div
              className={css`
                width: calc(100% - 50px);
                display: flex;
                align-items: center;
                justify-content: space-around;
              `}
            >
              {theme.colors.map((color, index) => {
                if (index > 3) {
                  return null;
                }
                return (
                  <div
                    key={color + index}
                    className={css`
                      width: 20px;
                      height: 20px;
                      border-radius: 6px;
                      background-color: ${color};
                    `}
                  ></div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
