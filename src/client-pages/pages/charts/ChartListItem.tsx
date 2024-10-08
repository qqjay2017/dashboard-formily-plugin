import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import type { IChartItem } from "./types";
import { cx } from "@/utils";

interface IChartListItemProps extends IChartItem {
  onEditClick?: Function;
  onRemoveClick?: Function;
}

const handleIconStyle = css`
  position: absolute;
  z-index: 10;
  top: 50%;
  right: 0px;
  margin-top: -20px;
  padding: 12px;
  cursor: pointer;
  &:hover {
    color: var(--dn-brand-color);
  }
`;

export function ChartListItem({
  name,
  id,
  coverThumbnail,
  description,
  onEditClick,
  onRemoveClick,
}: IChartListItemProps) {
  const navigate = useNavigate();
  return (
    <div
      className={css`
        /* width: 100%; */
        &:hover {
          box-shadow: rgba(29, 41, 57, 0.14) 0px 6px 18px;
        }
      `}
    >
      <div
        className={css`
          width: 100%;

          height: 207px;
          border-radius: 8px;
          border: 1px solid #e9ecf1;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        `}
      >
        <div
          onClick={() => {
            navigate(`/chart-edit/${id}`);
          }}
          className={css`
            width: 100%;
            height: 151px;
            background: #081c3d;
            background-image: url(${coverThumbnail});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            cursor: pointer;
          `}
        />
        <div
          className={css`
            width: 100%;
            height: 56px;
            padding: 11px 50px 11px 16px;
            position: relative;
            font-size: 16px;
            line-height: 16px;
          `}
        >
          <div
            className={cx(
              handleIconStyle,
              css`
                right: 28px;
              `
            )}
            onClick={() => {
              onEditClick && onEditClick();
            }}
          >
            <FaRegEdit />
          </div>
          <div
            className={cx(
              handleIconStyle,
              css`
                right: 0px;
              `
            )}
            onClick={() => {
              onRemoveClick && onRemoveClick();
            }}
          >
            <IoTrashOutline />
          </div>
          <div
            className={css`
              color: rgb(41, 60, 85);
              font-size: 14px;
              line-height: 20px;
            `}
          >
            {name}
          </div>
          <div
            className={css`
              margin-top: 4px;
              color: rgb(170, 170, 170);
              font-size: 12px;
              line-height: 16px;
            `}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
