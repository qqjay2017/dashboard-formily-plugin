export interface ProgressInfo {
    message: string
    percent: number
    error?: Error | null
}
export interface PutObjectParams {
    ContentLength?: number
    signal?: AbortSignal
    file: File
    action?: string
    qs?: Record<string, any>
    headers?: Record<string, any>
    apiData?: Record<string, any>
    API_URL?: string
    onProgress?: (info: ProgressInfo) => void
    /**
     * @deprecated
     */
    xhrIns?: XMLHttpRequest
    forceNoSlice?: boolean
}

export interface ApiFileModel {
    id?: any
    delFlag?: any
    dataVersion?: any
    createdId?: any
    createdEmplId?: any
    createdDatetime?: any
    modiId?: any
    modiEmplId?: any
    modiDatetime?: any
    busCode?: any
    busId?: any
    bucket: string
    objectName: string
    fileName: string
    fileSize: string
    fileType: string
    contentType: string
    pieceNum: number
    blockNum?: any
    transactionHash?: any
    txHash?: any
    docId?: any
    contentHash?: any
    transactionId?: any
    resource?: any
    proofWay?: any
    identifier: string
    fileSrcUrl: string
    uploadId?: any
}
