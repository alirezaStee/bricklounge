import Image from 'next/image';
import SocialMediaLink from '../shared/SocialMediaLink';
import CartToggleButton from '../shared/CartToggleButton';
import { IMAGE_PATHS } from '../../lib/constants';

export default function Header() {
  return (
    <header className="mt-5 flex w-full items-center justify-between p-4 md:mt-0">
      <Image
        src={IMAGE_PATHS.logo}
        alt="BrickLounge Logo"
        width={56}
        height={50}
        priority
      />

      <div className="mt-5 flex gap-4 sm:mt-0">
        <SocialMediaLink
          href="#"
          id="instagram"
          alt="اینستاگرام"
          src="/images/zomorod-instagram.svg"
        />
        <SocialMediaLink
          href="https://maps.app.goo.gl/aAhoZ9sd3w6HkEscA?g_st=ac"
          id="map"
          alt="موقعیت"
          src="/images/zomorod-location.svg"
        />
        <SocialMediaLink
          href="Tel:03432483632"
          id="phone"
          alt="تماس"
          src="/images/zomorod-phone.svg"
        />
      </div>

      <CartToggleButton />
    </header>
  );
}

