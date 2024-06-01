import React, { FC } from "react";
import { MainComponent } from "./MainComponent";

const Loading: FC = () => <div>Loading...</div>;
const AppError: FC<{ error: Error }> = ({ error }) => {
  return (
    <div>
      <div>App Error</div>
      {error?.message}
      {error?.stack}
    </div>
  );
};

const AppNotFound: FC = () => <div></div>;

export const defaultAppComponents = {
  AppMain: MainComponent,
  AppSpin: Loading,
  AppError: AppError,
  AppNotFound: AppNotFound,
};
