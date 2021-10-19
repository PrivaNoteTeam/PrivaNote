
 
// privanote://reset-password/12340fd
export function parseCodeFromUrl(url: string, type: string){

    let baseUrl: string;

    switch(type) {
        case 'resetPassword':
            baseUrl = 'privanote://reset-password/'
            break;
        default:
            return 'could not parse url'
    }

    return url.slice(baseUrl.length)


}