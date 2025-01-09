const defaultLocale = 'vi';

export const redirectTo = (url, locale) => {
  if (!url) {
    throw ('Invalid Url');
  }

  window.location.href = locale === defaultLocale ? url : `/${locale}/${url}`;
};


export const openNewTab = (url) => {
  if (!url) {
    throw ('Invalid Url');
  }

  window.open(url);
};
