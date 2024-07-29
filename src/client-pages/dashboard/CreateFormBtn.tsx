import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { get } from "lodash-es";
import { createDashboardFormSchema } from "./schema/createDashboardFormSchema";

import { FormDialogPortal, useFormDialog } from "@/schema-component";
import { type APiWrap, useAPIClient } from "@/api-client";

import { apiBase, getDesignSize } from "@/utils";

export function CreateFormBtn() {
  const navigate = useNavigate();
  const apiClient = useAPIClient();

  const { getFormDialog } = useFormDialog();
  return (
    <FormDialogPortal>
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
              const res = await apiClient.request<any, APiWrap<{ id: number }>>(
                {
                  url: `${apiBase}/dashboard`,
                  method: "POST",
                  data: {
                    userId: "123",
                    name,
                    description,
                    content: JSON.stringify({
                      root: {
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
                  },
                }
              );
              const id = get(res, "data.data.id");
              if (id) {
                navigate(`/dashboard-design/${id}`);
              }
              next(payload);
            })
            .open({});
        }}
      >
        新建
      </Button>
    </FormDialogPortal>
  );
}
