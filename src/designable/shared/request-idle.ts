import "requestidlecallback";
import { globalThisPolyfill } from "./globalThisPolyfill";

export interface IIdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => DOMHighResTimeStamp;
}

export interface IdleCallbackOptions {
  timeout?: number;
}

export function requestIdle(
  callback: (params: IIdleDeadline) => void,
  options?: IdleCallbackOptions
): number {
  return globalThisPolyfill.requestIdleCallback(callback, options);
}

export function cancelIdle(id: number) {
  globalThisPolyfill.cancelIdleCallback(id);
}
