import { css } from "@emotion/css";
import { allThemes } from "../../dashboard-themes";

interface ColorTypeSelectProps {
  value?: string;
  onChange?: (str?: string) => string;
}
export const ColorTypeSelect = ({ value, onChange }: ColorTypeSelectProps) => {
  return (
    <div
      className={css`
        margin-left: 0px;
      `}
    >
      {allThemes.map((theme) => {
        return (
          <div
            onClick={() => {
              onChange && onChange(theme.name);
            }}
            key={theme.name}
            className={css`
              border-radius: 4px;
              cursor: pointer;
              padding: 12px 24px;
              margin-bottom: 16px;
              width: 100%;
              min-width: 230px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid
                ${value === theme.name ? theme.colors[0] : "#ccc"};
            `}
          >
            <div
              className={css`
                width: 60px;
                text-align: left;
                white-space: nowrap;
                max-width: 100%;
                overflow: hidden;
              `}
            >
              {theme.zhName}
            </div>
            <div
              className={css`
                width: calc(100% - 60px);
                display: flex;
                align-items: center;
                justify-content: space-around;
              `}
            >
              {theme.colors.map((color, index) => {
                if (index > 5) {
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
};
