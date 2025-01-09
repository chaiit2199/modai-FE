import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IconEngLish from 'public/images/icon_english.svg';
import Dropdown from 'public/images/icons/icon_dropdown.svg';
import IconVietNam from 'public/images/icon_vietnam.svg';
import ButtonComponent from '@/components/shared/Button';

const SelectLanguage = () => {
  const { locale } = useRouter();
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const handleOnChangeLanguage = (e, nextLocale) => {
    e.preventDefault();
    localStorage.setItem('language', nextLocale);
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  useEffect(() => {
    const reloadPage = () => router.reload();

    router.events.on('routeChangeComplete', reloadPage);

    return () => {
      router.events.off('routeChangeComplete', reloadPage);
    };
  }, [router]);

  const isEnglish = () => locale === 'en';
  const isThai = () => locale === 'vi';

  return (
    <div className="language-switcher dropdown-basic">
      <ButtonComponent
        className="dropdown-basic__btn"
      >
        {locale === 'en' ? <IconEngLish /> : <IconVietNam />}  {locale.toUpperCase()} <Dropdown />
      </ButtonComponent>
      <div className="dropdown-basic__content">
        <Link
          locale={false}
          href="#!"
          onClick={(e) => handleOnChangeLanguage(e, 'en')}
          className={`${locale === 'en' ? 'active' : ''}`}
        >
          <IconEngLish /> English
        </Link>
        <Link
          locale={false}
          href="#!"
          onClick={(e) => handleOnChangeLanguage(e, 'vi')}
          className={`${locale === 'vi' ? 'active' : ''}`}
        >
          <IconVietNam />Việt Nam
        </Link>
      </div>
    </div>
  );
};

export default SelectLanguage;
