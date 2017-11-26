export class HTTPError extends global.Error {
    status: number
};

export function makeError(errMessage: string, errStatus: number) {
    const ret: HTTPError = new HTTPError(errMessage)
    ret.status = errStatus
    return ret
}
