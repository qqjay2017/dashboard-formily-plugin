import { get } from 'lodash-es'
import { message, notification } from 'antd'
import React from 'react'
import type { Application } from '../application'
import { APIClientSdk } from '../sdk/APIClient'

function handleErrorMessage(error, notification) {
    const errorMsg = get(error, 'response.data.error', '') || get(error, 'response.data.message', '')

    if (errorMsg) {
        return notify('error', [errorMsg], notification)
    }
}

function notify(type, messages, instance) {
    if (!messages?.length) {
        return
    }
    instance[type]({
        message: messages.map?.((item: any, index) => {
            return React.createElement(
                'div',
                { key: `${index}_${item.message}` },
                typeof item === 'string' ? item : item.message,
            )
        }),
    })
}

export class APIClient extends APIClientSdk {
    app: Application
    /** 该值会在 AntdAppProvider 中被重新赋值 */
    notification: any = notification
    message: any = message
    // constructor(options?: any) {
    //     super()

    // }

    interceptors() {
        // 基础拦截
        this.axios.interceptors.response.use((res) => {
            const code = get(res, 'data.code', '')
            if (code === 401) {
                sessionStorage.clear()
                window.location.reload()
            }

            if (res && res.headers && res.headers.access_token) {
                const access_token = res.headers.access_token
                const data = JSON.parse(decodeURIComponent(access_token))

                sessionStorage.setItem('ACCESS_TOKEN', data.access_token)
                sessionStorage.setItem('USER_INFO', JSON.stringify(data.user_info))
                sessionStorage.setItem('USER_NAME', data.user_info.name)
                sessionStorage.setItem('EXPIRES_IN', data.expires_in)
                sessionStorage.setItem('REFRESH_TOKEN', data.refresh_token)
                sessionStorage.setItem('sessionId', data.refresh_token)
                localStorage.setItem(
                    'storeSessionData',
                    JSON.stringify({
                        userInfo: data.user_info,
                        token: data.access_token,
                    }),
                )
            }
            return res
        }, (error) => {
            console.error(error, 'errorerrorerror')

            handleErrorMessage(error, this.notification)
            return Promise.reject(error)
        })
        super.interceptors()
    }
}
