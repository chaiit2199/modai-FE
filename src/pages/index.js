import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import Layout from '@/components/layout';
import HeaderBannerComponent from '@/components/HeaderBanner';
import TopTournaments from '@/components/Home/Sections/TopTournaments';
import FilterComponent from '@/components/Home/Sections/Filter';

export default function Home() {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Layout className="home-page">
      {/* <HeaderBannerComponent
        title={t('home.banner.title')}
        description={t('home.banner.description')}
      /> */}
      <div className='home-page__container container-inner'>
        <div className='home-page__content mb-20'>

          <div className='col-span-1 '>
            <TopTournaments />

          </div>
          <FilterComponent />
        </div>
      </div>
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
