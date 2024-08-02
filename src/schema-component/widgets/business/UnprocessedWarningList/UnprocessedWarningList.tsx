import { css } from "@emotion/css";

import { WarnListItem } from "./WarnListItem";
import type { SchemComponentWithDataSourceProps } from "@/types";

import { EmptyKit } from "@/dashboard-themes/style-components";
import injectApiInfo from "@/schema-component/hoc/injectApiInfo";

function UnprocessedWarningListMain({
  busData,
  isBusDataLoading,
}: SchemComponentWithDataSourceProps) {
  const warnList = busData || [];
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          font-size: 0.12rem;
          color: #ffd059;
          line-height: 0.12rem;
        `}
      >
        {`未处理预警共计  ${warnList.length}  条`}
      </div>
      <div
        className={css`
          width: 100%;
          height: calc(100% - 0.28rem);
          background: rgba(67, 110, 189, 0.1);
          overflow: hidden;
          padding: 0.15rem 0.24rem 0.12rem 0.24rem;
          margin-top: 0.16rem;
        `}
      >
        <EmptyKit loading={isBusDataLoading} empty={!warnList.length}>
          <div
            className={css`
              width: 100%;
              min-height: 100%;
              overflow: hidden auto;
            `}
          >
            {warnList.map((w, index) => {
              return <WarnListItem key={index} {...w} />;
            })}
          </div>
        </EmptyKit>
      </div>
    </div>
  );
}

export const UnprocessedWarningList = injectApiInfo(UnprocessedWarningListMain);
