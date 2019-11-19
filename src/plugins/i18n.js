import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'

import enGB from '@/plugins/i18n/en_GB.json'
import deDE from '@/plugins/i18n/de_DE.json'

Vue.use(VueI18n)

var messages = {
  en_GB: enGB,
  de_DE: deDE
}

export const i18n = new VueI18n({
  locale: null,
  fallbackLocale: 'en_GB',
  messages: messages
})

const loadedLanguages = []

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return axios.get(`clientlocale/${lang}`).then(m => {
    // If we get a response from the server, use it
    if (m.data) {
      // Delete the content of the about Germinate page, we don't want people to change it.
      delete m.data.pageAboutGerminateTitle
      delete m.data.pageAboutGerminateSubtitle
      delete m.data.pageAboutGerminateText
      delete m.data.pageAboutGerminateCardHomepageText
      delete m.data.pageAboutGerminateCardGithubText
      delete m.data.pageAboutGerminateCardPublicationText
      delete m.data.pageAboutGerminateCardDocumentationText
      delete m.data.pageAboutGerminateTeamTitle
      delete m.data.pageAboutGerminateTeamSubtitle
      delete m.data.pageAboutGerminateFundersTitle
      delete m.data.pageAboutGerminateFundersSubtitle
    }
    Object.assign(messages[lang], m.data)
    i18n.setLocaleMessage(lang, messages[lang])
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  }).catch(() => {
    // If we can't get it from the server, use the fallback we've got locally
    i18n.setLocaleMessage(lang, messages[lang])
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  })
}
