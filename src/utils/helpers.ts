interface IResponseError { statusCode: number; message: string; }
export const formatResponseError = (message: string, statusCode?: number): IResponseError => ({
    statusCode: statusCode || 400,
    message,
})
