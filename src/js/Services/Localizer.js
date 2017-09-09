(() => {
  const Localizer = (
    $http,
    $q,
    $window
  ) => {
    const Localizer = {}

    Localizer.supportedLocales = [{
      code: 'en-GB',
      language: 'English',
      flag: '🇬🇧'
    }, {
      code: 'ru-RU',
      language: 'Русский',
      flag: '🇷🇺'
    }]

    const defaultLocale = 'en-GB'

    Localizer.translations = {}

    Localizer.fetchTranslationsForLocale = locale => {
      if (Localizer.translations.hasOwnProperty(locale)) return $q.resolve()
      return $http.get(`${window.location.href}locales/${locale}.json`)
        .then(resp => {
          if (resp.status === 200) {
            Localizer.translations[locale] = resp.data
            return $q.when()
          }
          return $q.reject(resp.data)
        })
    }

    Localizer.userLocale = window.navigator.userLanguage || window.navigator.language

    Localizer.localizePage = () => {
      let userLocale = Localizer.userLocale
      if (!Localizer.supportedLocales.find(locale => locale.code === userLocale)) {
        userLocale = defaultLocale
      }

      Localizer.fetchTranslationsForLocale(userLocale)
        .then(() => {
          const translation = Localizer.translations[userLocale]
          Object.keys(translation).forEach(name => {
            const elements = $window.document.getElementsByName(name)
            elements.forEach(element => {
              element.innerHTML = translation[name]
            })
          })
        }).catch(console.error)
    }

    return Localizer
  }

  window.angular.module('eqMac')
    .service('Localizer', [
      '$http',
      '$q',
      '$window',
      Localizer
    ])
})()
