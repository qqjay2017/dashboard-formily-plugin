import { css } from "@emotion/css";
import { usePageLayoutContext } from "../../PageLayout/usePageLayoutContext";
import { cx } from "@/utils";

function ToggleMenuCollBtn() {
  const { menuCollapsed, setMenuCollapsed } = usePageLayoutContext();
  const toggleCollapsed = () => {
    setMenuCollapsed(!menuCollapsed);
  };

  return (
    <div
      onClick={toggleCollapsed}
      className={cx(css`
        position: absolute;
        right: 0;
        top: 14px;
        z-index: 101;
        width: 24px;
        height: 24px;
        text-align: center;
        border-radius: 40px;
        margin-right: -12px;
        transition: transform 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.25);
        background-color: #ffffff;
        box-shadow:
          0 2px 8px -2px rgba(0, 0, 0, 0.05),
          0 1px 4px -1px rgba(25, 15, 15, 0.07),
          0 0 1px 0 rgba(0, 0, 0, 0.08);

        :hover {
          color: rgba(0, 0, 0, 0.65);
        }
      `)}
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 12 12"
        fill="currentColor"
        aria-hidden="true"
        className={cx(
          css`
            transition: transform 0.3s;
          `,
          css`
            transform: rotate(${menuCollapsed ? "-90deg" : "90deg"});
          `
        )}
      >
        <path d="M6.432 7.967a.448.448 0 01-.318.133h-.228a.46.46 0 01-.318-.133L2.488 4.85a.305.305 0 010-.43l.427-.43a.293.293 0 01.42 0L6 6.687l2.665-2.699a.299.299 0 01.426 0l.42.431a.305.305 0 010 .43L6.432 7.967z"></path>
      </svg>
    </div>
  );
}

export default ToggleMenuCollBtn;
