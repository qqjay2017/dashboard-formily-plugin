import { Button } from "antd";
import { useApp } from "../../application/hooks";
import { useNavigate } from "react-router-dom";

import { ISchema } from "@formily/react";

import { FormDialogPortal, useFormDialog } from "../../schema-component";
import { APiWrap } from "../../api-client";
import { dashboardRootWrap } from "../../schema-component";
import { get } from "lodash-es";
import { createDashboardFormSchema } from "./createDashboardFormSchema";

export const CreateFormBtn = () => {
  const navigate = useNavigate();

  const app = useApp();

  const { getFormDialog } = useFormDialog();
  return (
    <FormDialogPortal>
      <Button
        type="primary"
        onClick={() => {
          const dialog = getFormDialog("新建", createDashboardFormSchema);
          dialog
            .forOpen((payload, next) => {
              next({
                initialValues: {
                  themeProvider: "technologyBlue",
                  isDarkTheme: true,
                },
              });
            })
            .forConfirm(async (payload, next) => {
              const { name, description, themeProvider, isDarkTheme } =
                payload.values;
              const res = await app.apiClient.request<
                any,
                APiWrap<{ id: number }>
              >({
                url: `/huang-api/dashboard`,
                method: "POST",
                data: {
                  userId: "123",
                  name,
                  description,
                  content: JSON.stringify(
                    dashboardRootWrap({
                      "x-component-props": {
                        cols: 12,
                        rows: 12,
                        rowheight: 80,
                        designWidth: 1920,
                        designHeight: 1080,
                        breakpoints: {
                          showroom: 2600,
                          desktop: 1300,
                          tablet: 500,
                          mobile: 0,
                        },
                        themeProvider: themeProvider,
                        isDarkTheme: isDarkTheme,
                      },
                    })
                  ),
                },
              });
              const id = get(res, "data.data.id");
              if (id) {
                navigate(`/design/${id}`);
              }
              next(payload);
            })
            .open();
        }}
      >
        新建
      </Button>
    </FormDialogPortal>
  );
};
