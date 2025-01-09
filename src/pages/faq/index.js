import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/layout';
import HeaderBannerComponent from '@/components/HeaderBanner';
import ContactUs from '@/components/ContactUs';
import FaqComponent from '@/components/FAQ';
import InputComponent from '@/components/shared/Input';
import SelectTags from '@/components/SelectTags';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function QuestionPage() {
  const [selectedTag, setSelectedTag] = useState('General Questions');
  const { t } = useTranslation();
  return (
    <Layout className="faq-page">
      <HeaderBannerComponent
        title={t('footer.faq')}
        size="small"
      />
      <FaqComponent
        withoutBackground={true}
        headerContent={
          <div className="faq-page__questions__header">
            <h1 className="font-ng-medium sms-title text-center">{t('components.faq.title_header')}</h1>
            <p className="font-ng-light text-center faq-page__questions__hint " dangerouslySetInnerHTML={{ __html: t('components.faq.description') }} />
            <div className="faq-page__questions__container">
              <InputComponent placeholder={t('footer.search')} suffixIcon="/images/icons/search-icon.svg" />
              <SelectTags setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
            </div>
          </div>
        }
        selectedTag={selectedTag}
      />
      <ContactUs title={t('home.contact_us.title')} />
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
