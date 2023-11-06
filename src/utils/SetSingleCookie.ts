export default function setSingleCookie(key: string,value: string,expiration?: Date)
{
    document.cookie=`${key}=${value}; ${expiration ? `expires=${expiration}` : ""}`;
}