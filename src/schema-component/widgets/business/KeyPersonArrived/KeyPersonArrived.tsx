import { get } from "lodash-es";
import { css } from "@emotion/css";

import type { KeyPersonItemType } from "./types";
import { KeyPersonnelItem } from "./KeyPersonnelItem";
import type { SchemComponentWithDataSourceProps } from "@/types";
import { useDataBindFetch, useQueryToBusParams } from "@/schema-component";
import { EmptyKit } from "@/themes/style-components";

export function KeyPersonArrived({
  dataSource,
  query,
}: SchemComponentWithDataSourceProps) {
  const busParams = useQueryToBusParams(query);
  const { data, isLoading } = useDataBindFetch(dataSource, busParams);
  const list: KeyPersonItemType[] = get(data, "data.data", []) || [];

  return (
    <EmptyKit loading={isLoading} empty={!list.length}>
      <div
        className={css`
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(${list.length}, 1fr); /* 4列 */
          grid-template-rows: repeat(1, 1fr);
          align-items: center;
          justify-content: center;
        `}
      >
        {list.map((p, index) => {
          return <KeyPersonnelItem key={index} {...p} />;
        })}
      </div>
    </EmptyKit>
  );
}
