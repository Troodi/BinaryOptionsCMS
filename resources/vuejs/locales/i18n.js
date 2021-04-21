import Vue from 'vue'
import VueI18n from 'vue-i18n'
import russian from '../locales/ru.json'
import english from '../locales/en.json'
import spain from '../locales/es.json'

Vue.use(VueI18n)

let messages = {
    en : english,
    es : spain,
    ru : russian,
}
window.locales = Object.keys(messages);

export default new VueI18n({
    locale: getCookie('currentLanguage') ? getCookie('currentLanguage') : 'en',
    fallbackLocale: 'en',
    messages
})

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}