const path = require('path');

module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    localeDetection: false,
  },
  localePath: path.resolve('./src/static/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
 