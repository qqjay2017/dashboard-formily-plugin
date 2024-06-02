import { FormDialog as AntdFormDialog, FormLayout } from "@formily/antd-v5";
import { SchemaComponent, SchemaComponentOptions } from "../../core";
import { ConfigProvider } from "antd";
import { ISchema, SchemaOptionsContext } from "@formily/react";
import { useContext } from "react";

export const FormDialogPortal = AntdFormDialog.Portal;

export const useFormDialog = () => {
  const options = useContext(SchemaOptionsContext);
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const getFormDialog = (title = "", schema: ISchema) =>
    AntdFormDialog(title, () => {
      return (
        <SchemaComponentOptions
          inherit
          scope={options.scope}
          components={options.components}
        >
          <FormLayout labelCol={6} wrapperCol={18}>
            <ConfigProvider locale={locale}>
              <SchemaComponent
                components={options.components}
                scope={options.scope}
                schema={schema}
              />
            </ConfigProvider>
          </FormLayout>
        </SchemaComponentOptions>
      );
    });
  return {
    getFormDialog,
  };
};

// export const FormDialog = () => {
//   const options = useContext(SchemaOptionsContext);
//   const { locale } = useContext(ConfigProvider.ConfigContext);
//   return (
//     <AntdFormDialog.Portal>
//       <Button
//         type="primary"
//         onClick={() => {
//           const dialog = AntdFormDialog("弹窗表单", () => {
//             return (
//               <SchemaComponentOptions
//                 inherit
//                 scope={options.scope}
//                 components={options.components}
//               >
//                 <FormLayout labelCol={6} wrapperCol={18}>
//                   <ConfigProvider locale={locale}>
//                     <SchemaComponent
//                       components={options.components}
//                       scope={options.scope}
//                       schema={schema}
//                     />
//                   </ConfigProvider>
//                 </FormLayout>
//               </SchemaComponentOptions>
//             );
//           });
//           dialog
//             .forOpen((payload, next) => {
//               next({
//                 initialValues: {
//                   themeProvider: "technologyBlue",
//                   isDarkTheme: true,
//                 },
//               });
//             })
//             .forConfirm((payload, next) => {
//               console.log(payload);
//               next(payload);
//             })
//             .forCancel((payload, next) => {
//               console.log(payload);
//               next(payload);
//             })
//             .open()
//             .then(console.log);
//         }}
//       >
//         新建
//       </Button>
//     </AntdFormDialog.Portal>
//   );
// };
