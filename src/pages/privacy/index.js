/* eslint-disable react/no-unescaped-entities */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '@/components/layout';
import HeaderBannerComponent from '@/components/HeaderBanner';
import FileIcon from 'public/images/icons/file-icon.svg';
import ContactUs from '@/components/ContactUs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function PrivacyPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Layout className="terms-page">
      <HeaderBannerComponent
        title={t('footer.term_conditions')}
        size="small"
      />

      <div className="container">
        <div className="d-flex">
          <div className="terms-page__contents font-ng-regular">
            {
              locale === 'vi' && <div dangerouslySetInnerHTML={{ __html: t('privacy_policy.title') }} />
            }
            <div dangerouslySetInnerHTML={{ __html: t('privacy_policy.data_collection') }} />
            <div dangerouslySetInnerHTML={{ __html: t('privacy_policy.cookies') }} />
            <div dangerouslySetInnerHTML={{ __html: t('privacy_policy.data_security') }} />
            <div dangerouslySetInnerHTML={{ __html: t('privacy_policy.change') }} />
          </div>
        </div>
      </div>
      <ContactUs title={t('pricing_page.contact_us.title')} />
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
