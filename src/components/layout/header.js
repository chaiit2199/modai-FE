import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MenuItems from '@/components/Header/MenuItems';
import InputComponent from '@/components/shared/Input';
import Logo from 'public/images/logo.svg';
import SmsMktIcon from 'public/images/icons/menu/sms-mkt-icon.svg';
import SmsOtpIcon from 'public/images/icons/menu/sms-otp-icon.svg';
import SelectLanguage from '@/components/Header/SelectLanguage';
import { useTranslation } from 'next-i18next';

function Header() {
  const { locale, defaultLocale } = useRouter();
  const [navActive, setNavActive] = useState(null);
  const { t } = useTranslation();

  const MENU_LIST = [
    {
      text: <span dangerouslySetInnerHTML={{ __html: t('footer.services') }} />,
      url: '/',
    },
    {
      text: <span dangerouslySetInnerHTML={{ __html: t('footer.term_conditions') }} />,
      url: '/terms',
    },
    {
      text: <span dangerouslySetInnerHTML={{ __html: t('footer.contact') }} />,
      url: '/contact-us',
    },
  ];

  useEffect(() => {
    if (navActive) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [navActive]);

  const handleOnClickMenu = (menu) => {
    if (!menu.submenu) {
      setNavActive(false);
    }
  };

  const handleOnClickNavMenuBar = () => {
    setNavActive(!navActive);
  };

  return (
    <header className='header'>
      <div className='header__inner'>
        <div className="container">
          <nav className="nav_bar">
            <Link href={'/'} className="logo" locale={locale}>
              <Logo />
            </Link>
            <div className={`${navActive ? 'active' : ''} nav__menu-list`}>
              {MENU_LIST.map((menu, idx) => (
                <div
                  onClick={() => handleOnClickMenu(menu)}
                  key={menu.url}
                  className="nav__menu-item"
                >
                  <MenuItems items={menu} locale={locale} />
                </div>
              ))}
            </div>

            <div className="d-flex button-actions">
              <SelectLanguage />
              {/* <InputComponent placeholder={t('footer.search')} suffixIcon="/images/icons/search-icon.svg" /> */}
            </div>

            <div className="right-menu">
              <div onClick={handleOnClickNavMenuBar} className={'nav__menu-bar'}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </nav>
        </div>

      </div>
    </header>
  );
}

export default Header;
