import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from 'public/images/logo.svg';

export default function Footer() {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <footer className="footer">
      <div className="footer__up">
        <div className="container-inner flex justify-center">
          © Copyright 2025 FotMob
        </div>
      </div>
    </footer>
  );
}
