import React, { JSX } from 'react';
import { ImageField, Field, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

export type FooterProps = ComponentProps & {
  fields: {
    BackgroundImage: ImageField;
    Title: Field<string>;
    Subtitle: Field<string>;
    Icon1: ImageField;
    Title1: Field<string>;
    Subtitle1: Field<string>;
    Icon2: ImageField;
    Title2: Field<string>;
    Subtitle2: Field<string>;
  };
};

const Footer = (props: FooterProps): JSX.Element => {
  const bgUrl = props.fields.BackgroundImage?.value?.src;

  return (
    <section
      id="homecolumnbottom"
      className="relative w-full min-h-screen bg-cover bg-center"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      {/* Optional dark overlay for legibility */}s
      <div className="absolute inset-0 bg-black/40" />

      {/* HERO LAYER (relative container for absolute-positioned children) */}
      <div className="relative min-h-screen">
        {/* Dotted arc image */}
        <div className="absolute left-1/2 top-[25px] -translate-x-1/2
            w-[min(760px,90vw)]
            text-left
            md:top-[25px]
            lg:top-[25px]">
          <img
            src="https://jzi-verticals.sitecoresandbox.cloud/api/public/content/a57f3f30021b4a129173aa9c4faaa73d?v=4f200d16"
            alt=""
            aria-hidden="true"
            className="
            absolute left-6 top-16
            w-[420px] max-w-[70vw]
            md:left-10 md:top-20 md:w-[520px]
            lg:left-14 lg:top-24 lg:w-[620px]
            pointer-events-none select-none
          "
          />

          {/* Title + subtitle */}
          <div
            className="pl-280px
            absolute left-[550px] top-20 -translate-x-1/2
            w-[min(760px,90vw)]
            text-left
            md:top-20
            lg:top-24
          "
          >
            <h1 className="text-white font-semibold leading-[1.05] text-4xl md:text-6xl lg:text-7xl">
              <Text field={props.fields.Title} />
            </h1>

            <h3 className="mt-6 text-accent font-semibold text-lg md:text-xl lg:text-2xl">
              <Text field={props.fields.Subtitle} />
            </h3>
          </div>
        </div>
        {/* Bottom-right CTA panel (overlay) */}
        <div className="absolute bottom-0 right-0 w-full flex justify-end">
          <div className="w-full md:w-[760px] grid grid-cols-1 md:grid-cols-2">
            {/* Left CTA */}
            <div className="p-8 text-white bg-[#005758]">
              <div className="flex flex-col items-start space-y-4">
                <img
                  src="https://www.tdsynnex.com/na/wp-content/uploads/sites/2/2022/08/home-icon10New.png"
                  alt="Partner With Us Icon"
                  className="w-[58px] h-auto"
                />

                <h3 className="text-xl font-semibold text-white">
                  <Text field={props.fields.Title1} />
                </h3>

                <div className="space-y-1 text-white/80">
                  <a
                    href="https://www.tdsynnex.com/na/ca/become-a-customer/"
                    className="block hover:underline"
                  >
                    Become a Customer
                  </a>
                  <a
                    href="https://www.tdsynnex.com/na/ca/become-a-vendor/"
                    className="block hover:underline"
                  >
                    Become a Vendor
                  </a>
                </div>
              </div>
            </div>

            {/* Right CTA */}
            <div className="p-8 text-white bg-[#003031] border-t border-white/15 md:border-t-0 md:border-l md:border-white/15">
              <div className="flex flex-col items-start space-y-4">
                <img
                  src="https://www.tdsynnex.com/na/wp-content/uploads/sites/2/2022/08/home-icon9New.png"
                  alt="Take a Tour Icon"
                  className="w-[58px] h-auto"
                />

                <h3 className="text-xl font-semibold text-white">
                  <Text field={props.fields.Title2} />
                </h3>

                <div className="space-y-1 text-white/80">
                  <a
                    href="https://www.tdsynnex.com/ca/en/about-us.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:underline"
                  >
                    Explore TD SYNNEX
                  </a>
                  <a
                    href="https://www.tdsynnex.com/ca/en/about-us/corporate-citizenship.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:underline"
                  >
                    Discover Our Sustainable Future
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Icon (bottom-left) */}
        <div className="absolute bottom-6 left-6">
          <img
            src="https://www.tdsynnex.com/na/wp-content/uploads/sites/2/2022/08/mouse-down-icon.png"
            alt="Scroll Down"
            className="w-[19px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export const Default = Footer;
