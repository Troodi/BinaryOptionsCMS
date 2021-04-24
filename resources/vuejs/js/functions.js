export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

export function findLocalizedText(text){
    try {
        let localized = 'Text not found...';
        let getFromLocale = text[getCookie('currentLanguage')];
        if (getFromLocale != null) {
            return getFromLocale;
        }
        window.locales.forEach((item) => {
            let current = text[item];
            if (current != null) {
                localized = current;
                return false;
            }
        });
        return localized;
    } catch (e) {
        return 'Loading...';
    }
}