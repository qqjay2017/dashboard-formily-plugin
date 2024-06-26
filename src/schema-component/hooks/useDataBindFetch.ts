import { useQuery, useReqApiProxy } from '@/api-client';
import { get } from 'lodash-es';
import { useMemo } from 'react'

/**
 * TODO  数据源执行处理
 * @param dataSource 
 * @returns 
 */
export const useDataBindFetch = (dataSource) => {
    const { request } = useReqApiProxy();
    const { data, ...rest } = useQuery({
        queryKey: ["dataSourceQuery", dataSource?.dataSourceId],
        enabled: !!dataSource?.dataSourceId,
        queryFn: () =>
            request({
                apiId: dataSource?.dataSourceId,
            }),
    });
    const dataMemo = useMemo(() => {
        if (!data || !dataSource?.dataSourceId || !dataSource?.afterScript) {
            return data;
        }

        try {
            // 请求后脚本
            const afterScriptHandle = new Function(
                "apiRes",
                "context",
                dataSource.afterScript
            );
            const r = afterScriptHandle(data, { get });
            if (typeof r === "object") {
                return JSON.stringify(r);
            }
            return r;
        } catch (error) {
            console.log(error, "函数执行报错");
            return data;
        }
    }, [data, dataSource?.dataSourceId, dataSource?.afterScript]);
    return {
        ...rest,
        data: dataMemo
    }
}
