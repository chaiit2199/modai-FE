import { appWithTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import '@/styles/globals.scss';
import '@/styles/theme.scss';

function App({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      offset: 200,
    });
  }, []);

  return (
    <Component {...pageProps} />
  );
}

export default appWithTranslation(App);
