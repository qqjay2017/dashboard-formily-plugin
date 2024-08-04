import { get } from "lodash-es";
import { useDataBindFetch, useQueryToBusParams } from "../hooks";
import { takeFirstApiInfo } from "../shared";
import type { SchemComponentWithDataSourceProps } from "@/types";

export default function injectApiInfo(WrapComponent) {
  return (props: SchemComponentWithDataSourceProps) => {
    const { apiInfo, queryKeys } = props;
    const queryParams = useQueryToBusParams(queryKeys);

    const { data: busDataRes, isLoading: isBusDataLoading } = useDataBindFetch(
      apiInfo,
      queryParams
    );

    const firstApiInfo = takeFirstApiInfo(apiInfo);
    if (firstApiInfo && firstApiInfo.dataSourceId) {
      const busData = get(busDataRes, "data");
      return (
        <WrapComponent
          {...props}
          queryParams={queryParams}
          busDataRes={busDataRes}
          busData={busData}
          isBusDataLoading={isBusDataLoading}
          loading={isBusDataLoading}
          empty={!busData}
        />
      );
    }
    return (
      <WrapComponent
        {...props}
        queryParams={queryParams}
        apiInfo={apiInfo}
        queryKeys={queryKeys}
      />
    );
  };
}
