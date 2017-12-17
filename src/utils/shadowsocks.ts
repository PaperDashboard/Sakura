import { Buffer } from "buffer";
import * as base64 from 'urlsafe-base64';

export default {}

function toBase64(str: string): string {
    return base64.encode(new Buffer(str))
}

export function getLink({
    host = '127.0.0.1',
    port = 1234,
    password = 'aaabbb',
    method = 'aes-128-cfb',
    protocol = 'auth_aes128_md5',
    obfs = 'tls1.2_ticket_auth',
    remarks = '',
    group = 'Sakura',
    obfsparam = '',
    protoparam = '',
    udpport = 0,
    uot = 0
}): string {
    let ret = ''
    const base64pass = toBase64(password);
    ret += `${host}:${port}:${protocol}:${method}:${obfs}:${base64pass}`
    ret += "/?"
    if (obfsparam !== '') {
        ret += `obfsparam=${toBase64(obfsparam)}&`
    }
    if (protoparam !== '') {
        ret += `protoparam=${toBase64(protoparam)}&`
    }
    if (remarks !== '') {
        ret += `remarks=${toBase64(remarks)}&`
    }
    ret += `group=${toBase64(group)}&udpport=${udpport}&uot=${uot}`
    return `ssr://${toBase64(ret)}`;
}
