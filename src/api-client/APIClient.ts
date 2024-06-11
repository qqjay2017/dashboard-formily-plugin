import { get } from "lodash-es";
import { Application } from "../application";
import { APIClientSdk } from "../sdk/APIClient";
import { notification } from 'antd';
import React from "react";

const handleErrorMessage = (error, notification) => {
    const errorMsg = get(error, 'response.data.error', '');
    console.log(errorMsg, 'errorMsg')
    if (errorMsg) {
        notify('error', [errorMsg], notification);
    }

};

function notify(type, messages, instance) {
    if (!messages?.length) {
        return;
    }
    instance[type]({
        message: messages.map?.((item: any, index) => {
            return React.createElement(
                'div',
                { key: `${index}_${item.message}` },
                typeof item === 'string' ? item : item.message,
            );
        }),
    });
}

export class APIClient extends APIClientSdk {
    app: Application;
    /** 该值会在 AntdAppProvider 中被重新赋值 */
    notification: any = notification;
    // constructor(options?: any) {
    //     super()

    // }

    interceptors() {
        // 基础拦截
        this.axios.interceptors.response.use((res) => {
            return res;
        }, (error) => {

            handleErrorMessage(error, this.notification);
            return error
        });
        super.interceptors()


    }

}