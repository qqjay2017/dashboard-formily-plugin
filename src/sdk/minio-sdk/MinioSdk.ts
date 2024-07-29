import type { ApiFileModel, PutObjectParams } from './types'

declare global {
    interface Window {
        CoreMinioSdk: any
    }
    const CoreMinioSdk: any

}

const minioSdk = new CoreMinioSdk.MinioSdk({

})

export default minioSdk
