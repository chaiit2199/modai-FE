import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import HeaderBannerComponent from '@/components/HeaderBanner';
import ContactUs from '@/components/ContactUs';

export default function TermPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Layout className="terms-page">
      <HeaderBannerComponent title={t('footer.term_conditions')} size="small" />

      <div className="container">
        <div className="d-flex">
          <div className="terms-page__contents font-ng-regular">
            {locale === 'vi' && (
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: t('terms.welcome_website'),
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: t('terms.use_of_website'),
                  }}
                />
              </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: t('terms.acceptance') }} />
            <div
              dangerouslySetInnerHTML={{ __html: t('terms.user_conduct') }}
            />
            <div dangerouslySetInnerHTML={{ __html: t('terms.disclaimer') }} />
            <div dangerouslySetInnerHTML={{ __html: t('terms.limitation') }} />
            <div
              dangerouslySetInnerHTML={{ __html: t('terms.governing_law') }}
            />
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
