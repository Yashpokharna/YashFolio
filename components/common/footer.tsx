import { EMAIL, MENULINKS, SOCIAL_LINKS } from "../../constants";
import Image from "next/image";
import Button, { ButtonTypes } from "./button";

const Footer = () => {
  const renderSocialIcons = (): React.ReactNode => {
    return Object.keys(SOCIAL_LINKS).map((el: keyof typeof SOCIAL_LINKS) => (
      <a
        href={SOCIAL_LINKS[el]}
        key={el}
        className="px-1 duration-300 link hover:opacity-80 md:px-2"
        rel="noreferrer"
        target="_blank"
      >
        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
      </a>
    ));
  };

  const renderFooterContent = (): React.ReactNode => (
    <>
      <h1 className="text-3xl font-medium text-center md:text-4xl">
        Sweet, this is it from my side! Now it is your turn to say hi.
      </h1>
      <div className="flex mt-8">{renderSocialIcons()}</div>
      <div className="flex mt-8">
        <Button
          classes="mr-3"
          type={ButtonTypes.OUTLINE}
          name="Resume"
          otherProps={{
            target: "_blank",
            rel: "noreferrer",
          }}
          href="/Yash_Resume.pdf"
        ></Button>
        <Button
          classes="ml-3"
          type={ButtonTypes.WHITE}
          name="Shoot me an Email"
          href="mailto:yashpokharna2002@gmail.com"
          otherProps={{
            target: "_blank",
            rel: "noreferrer",
          }}
        ></Button>
      </div>
      <h2 className="mt-8 text-sm text-center sm:text-base">
        Designed and Developed with ❤️ by Yash
      </h2>
      {/* <h2 className="mt-8 text-sm -8 center sm:text-base">
        © - 2025
        <a href="https://github.com/Yashpokharna" className="ml-1 font-bold text-secondary-900">@Yashpokharna</a>
      </h2> */}
    </>
  );

  const { ref: footerRef } = MENULINKS[3];

  return (
    <footer
      className="relative flex flex-col items-stretch w-full bg-cover select-none"
      id={footerRef}
    >
      <img
        src="/footer-curve.svg"
        alt="Footer"
        className="w-full"
        loading="lazy"
        height={290}
        role="presentation"
        width={1440}
      />
      <div className="w-full h-full">
        <div className="z-10 flex flex-col items-center justify-end h-full py-12 section-container">
          {renderFooterContent()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
