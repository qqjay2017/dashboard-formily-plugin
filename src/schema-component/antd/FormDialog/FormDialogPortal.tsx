import { FormDialog as AntdFormDialog } from "@formily/antd-v5";
import { createPortalProvider } from "@formily/antd-v5/lib/__builtins__";

export const FormDialogPortal = AntdFormDialog.Portal;

export const ModalDialogPortal = createPortalProvider("modal-dialog");
