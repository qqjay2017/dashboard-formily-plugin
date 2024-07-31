import { css } from "@emotion/css";
import { theme } from "antd";
import { allThemes } from "@/dashboard-themes";

interface ColorTypeSelectProps {
  value?: string;
  onChange?: (str?: string) => string;
}
export function ColorTypeSelect({ value, onChange }: ColorTypeSelectProps) {
  const { token } = theme.useToken();

  return (
    <div
      className={css`
        width: 100%;
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
              height: 40px;
              display: flex;
              align-items: center;
              border: 1px solid ${isActive ? theme.colors[0] : "#ccc"};
              &:last-of-type {
                margin-bottom: 0;
              }
            `}
          >
            <div
              className={css`
                width: 70px;
                text-align: left;
                white-space: nowrap;
                color: ${isActive ? theme.colors[0] : token.colorText};
              `}
            >
              {theme.zhName}
            </div>
            {theme.colors.map((color, index) => {
              return (
                <div
                  key={color + index}
                  className={css`
                    margin: 0 10px;
                    width: 20px;
                    height: 20px;
                    border-radius: 6px;
                    background-color: ${color};
                  `}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function ColorTypeSelect2({ value, onChange }: ColorTypeSelectProps) {
  const { token } = theme.useToken();

  return (
    <div
      className={css`
        width: 100%;
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
              padding: 0 10px 10px 10px;
              margin-bottom: 16px;
              width: 100%;

              border: 1px solid ${isActive ? theme.colors[0] : "#ccc"};
              &:last-of-type {
                margin-bottom: 0;
              }
            `}
          >
            <div
              className={css`
                width: 70px;
                text-align: left;

                white-space: nowrap;
                color: ${isActive ? theme.colors[0] : token.colorText};
              `}
            >
              {theme.zhName}
            </div>
            <div
              className={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
              `}
            >
              {theme.colors.map((color, index) => {
                if (index > 4) {
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
