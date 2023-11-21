export default function setSingleCookie(key: string,value: string,expiration?: string)
{
    let date;
    if(expiration){
        date = new Date(expiration);
    }
    document.cookie=`${key}=${value}; ${date ? `expires=${date.toUTCString()}` : ""}; secure`;
}