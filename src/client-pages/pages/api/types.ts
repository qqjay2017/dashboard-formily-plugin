export type IApiType = "json" | "js" | "http" | "magic";

export interface IApiManageItem {
  name: string;
  id: string;
  type: IApiType;
  data?: any;
}
