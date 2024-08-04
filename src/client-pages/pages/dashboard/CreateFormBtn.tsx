import { Button } from "antd";

import { createDashboardFormSchema } from "./createDashboardFormSchema";
import { useUpdateDesignerApi } from "./useUpdateDesignerApi";

import { useCreateEffcts } from "./useCreateEffcts";
import { getDesignSize } from "@/utils";
import { getFormDialog } from "@/schema-component/antd";
import { useTypeParam } from "@/client-pages/hooks";

export function CreateFormBtn({ refetch }: { refetch: Function }) {
  const createEffcts = useCreateEffcts();
  const { typeParam } = useTypeParam();

  const updateDesignerApi = useUpdateDesignerApi();
  return (
    <Button
      type="primary"
      onClick={() => {
        const dialog = getFormDialog(
          {
            title: "新建",
          },
          createDashboardFormSchema
        );
        dialog
          .forOpen((payload, next) => {
            next({
              effects: createEffcts,
              initialValues: {
                appGroupId: !typeParam || typeParam === "all" ? "" : typeParam,
              },
            });
          })
          .forConfirm(async (payload, next) => {
            const {
              name,
              description,
              themeProvider,
              isDarkTheme,
              designWidthEnum,
            } = payload.values;

            const { designWidth, designHeight } =
              getDesignSize(designWidthEnum);
            await updateDesignerApi({
              ...payload.values,
              name,
              description,

              content: JSON.stringify({
                root: {
                  customBg: "",
                  showBg: true,
                  mobileAutoFit: true,
                  designWidthEnum,
                  cols: 12,
                  rows: 12,
                  rowheight: 80,
                  designWidth,
                  designHeight,
                  breakpoints: {
                    showroom: 2600,
                    desktop: 1300,
                    tablet: 500,
                    mobile: 0,
                  },
                  themeProvider,
                  isDarkTheme,
                },
                schema: {
                  type: "object",
                  properties: {},
                },
              }),
            });
            refetch();

            // const id = res?.id;
            // if (id) {
            //   navigate(`/dashboard-design/${id}`);
            // }
            next(payload);
          })
          .open({});
      }}
    >
      新建
    </Button>
  );
}
