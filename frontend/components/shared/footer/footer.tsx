import React from "react";
import { footerElements, footerSocials } from "./footer-elements";
import Image from "next/image";
import mainIcon from "@/assets/icons/mainicon.jpg";
import { Facebook, Instagram, LucideIcon, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between text-white mb-28">
        <Link href="/">
          <div className="flex gap-2 items-center font-redHat font-bold">
            <Image src={mainIcon} alt="MainIcon" className="w-7 h-7" />
            <h1>HOME GYM EQUIPMENT</h1>
          </div>
        </Link>
        <div className="flex gap-16 ">
          {footerElements.map((footerElement, index) => (
            <FooterNavContents
              key={index}
              title={footerElement.title}
              contents={footerElement.contents}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mb-12">
        <div>
          <p className="font-redHat text-secondary text-xs">
            &#169; Copyright HOME GYM EQUIPMENT 2024. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          {footerSocials.map((footerSocial, index) => (
            <FooterSocialIcon
              key={index}
              Icon={footerSocial.icon}
              link={footerSocial.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface FooterNavProps {
  title: string;
  contents: {
    title: string;
    link: string;
  }[];
}

const FooterNavContents: React.FC<FooterNavProps> = ({ contents, title }) => {
  return (
    <div>
      <h1 className="mb-5 font-redHat font-bold uppercase text-xl">{title}</h1>
      <ul className="flex flex-col list-none gap-2">
        {contents.map((content, index) => (
          <li
            key={index}
            className="text-secondary cursor-pointer hover:text-primary transition-all duration-100"
          >
            {content.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface FooterSocialIconProps {
  Icon: LucideIcon;
  link: string;
}

const FooterSocialIcon: React.FC<FooterSocialIconProps> = ({ Icon, link }) => {
  return (
    <div className="rounded-full w-8 h-8 bg-primary flex items-center justify-center cursor-pointer">
      <Icon className="" size={20} />
    </div>
  );
};

export default Footer;