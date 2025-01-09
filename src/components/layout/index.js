import Head from 'next/head';
import Footer from './footer';
import Header from './header';

export default function Layout({ children, className }) {
  return (
    <>
      <Head>
        <title>Bóng đá</title>
        <meta name="description" content="sms2buy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}
