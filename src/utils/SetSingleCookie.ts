export default function setSingleCookie(key: string,value: string,expirationInMinutes: number)
{
    const expiration = (new Date(Date.now() + expirationInMinutes*60*1000)).toUTCString();
    document.cookie=`${key}=${value}; expires=${expiration}`;
}