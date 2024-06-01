import { Button } from "antd";
import { useApp } from "../../application/hooks";
import { useNavigate } from "react-router-dom";
import { FormDialog } from "@formily/antd-v5";

import { ISchema } from "@formily/react";

import { useFormDialog } from "../../schema-component/antd/FormDialog/FormDialog";
import { APiWrap } from "../../api-client";
import { dashboardRootWrap } from "../../schema-component";
import { get } from "lodash-es";

const schema: ISchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "名称",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    themeProvider: {
      type: "string",
      title: "主题颜色",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "ColorTypeSelect",
    },
    isDarkTheme: {
      type: "boolearn",
      title: "主题风格",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "IsDarkThemeSelect",
    },
    description: {
      type: "string",
      title: "描述",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input.TextArea",
    },
  },
};
export const CreateFormBtn = () => {
  const navigate = useNavigate();

  const app = useApp();

  const { getFormDialog } = useFormDialog();
  return (
    <FormDialog.Portal>
      <Button
        type="primary"
        onClick={() => {
          const dialog = getFormDialog("新建", schema);
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
                next(payload);
              }
            })

            .open();
        }}
      >
        新建
      </Button>
    </FormDialog.Portal>
  );
};
