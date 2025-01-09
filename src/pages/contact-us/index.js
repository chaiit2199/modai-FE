import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Layout from '@/components/layout';
import HeaderBannerComponent from '@/components/HeaderBanner';
import ContactUs from '@/components/ContactUs';
import FaqComponent from '@/components/FAQ';

export default function ContactUsPage() {
  const { t } = useTranslation();

  return (
    <Layout className="contact-us-page">
      <HeaderBannerComponent
        title={t('home.contact_us.title')}
        size="small"
      />
      <ContactUs title={ t('components.form.have_question')} />
      <FaqComponent />
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
