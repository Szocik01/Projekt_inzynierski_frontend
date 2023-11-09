export default function setSingleCookie(key: string,value: string,expiration?: string)
{
    document.cookie=`${key}=${value}; ${expiration ? `expires=${expiration}` : ""}`;
}