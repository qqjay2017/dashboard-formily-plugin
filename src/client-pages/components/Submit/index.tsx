import type { IFormFeedback } from "@formily/core";
import { useParentForm } from "@formily/react";
import type { ButtonProps } from "antd";
import { Button } from "antd";

export interface ISubmitProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => any;
  onSubmit?: (values: any) => any;
  onSubmitSuccess?: (payload: any) => void;
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void;
}

/**
 * 提交按钮封装
 * @param param0
 * @returns
 */

export default function Submit({
  onSubmit,
  onSubmitSuccess,
  onSubmitFailed,
  children,
  ...props
}: ISubmitProps) {
  const form = useParentForm();
  return (
    <Button
      {...props}
      loading={props.loading !== undefined ? props.loading : form.submitting}
      onClick={async (e) => {
        try {
          if (props.onClick) {
            if (props.onClick(e) === false) return false;
          }
          if (onSubmit) {
            const values = await form.submit(onSubmit);
            onSubmitSuccess && onSubmitSuccess(values);
          }
        } catch (error) {
          console.log(error, "Submit error");
        }
      }}
    >
      {children}
    </Button>
  );
}
