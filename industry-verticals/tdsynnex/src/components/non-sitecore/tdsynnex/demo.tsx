import React, { JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <>
      <section className="w-full bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="space-y-6">
            <h2 className="text-3xl leading-tight md:text-4xl text-[#005758]">
              Unlocking Potential in a Dynamic Marketplace
            </h2>

            <p className="max-w-3xl text-base leading-relaxed">
              TD SYNNEX brings together solutions for every type of ecosystem partner
              with global technology distribution and solution aggregation
              capabilities. We simplify the complex so you can maximize value to your
              end users.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <figure className="w-full">
                <div className="relative w-full overflow-hidden rounded">
                  <div className="relative w-full pb-[75.6944%]">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/AdobeStock_513907869@2x.jpg"
                      alt="Unlocking Potential"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
                <figcaption className="sr-only">Unlocking Potential</figcaption>
              </figure>
            </div>

            <div className="lg:col-span-6">
              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-semibold text-[#005758]">
                    How we simplify
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5">
                    <li>A library of seamless-to-deploy Click to Run™ Solutions</li>
                    <li>Proven paths to success developed by system engineers and solution architects</li>
                    <li>Personalized support for custom and purpose-built solutions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#005758]">
                    How you benefit
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5">
                    <li>Get to market faster</li>
                    <li>Leverage technical expertise and lower costs</li>
                    <li>Create experiences that increase end user satisfaction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section (Tailwind, no inline styles, TSX-ready with className) */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl leading-tight md:text-4xl text-[#005758]">
              Contributing to the Ecosystem of Ideas
            </h2>

            <p className="max-w-3xl text-base md:text-lg leading-relaxed">
              TD SYNNEX sits at the center of the Technology Partner Ecosystem.
              Our unique position gives us the opportunity to lead as a solutions
              aggregator and an ideas aggregator.
            </p>
          </div>

          <div className="mt-10">
            <div className="relative w-full overflow-hidden rounded">
              {/* Original image: 2077x940 (~45.26% aspect ratio) */}
              <div className="relative w-full pb-[45.26%]">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-570@2x.jpg"
                  alt="Ecosystem"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Full-width section (Tailwind, TSX-ready, no inline styles) */}
      <section className="w-full bg-[#f5f5f5]">
        {/* Boxed content container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex justify-center text-center">
            <h2 className="text-3xl md:text-4xl leading-tight text-[#005758] max-w-4xl">
              Keeping pace with the headlines and insights from the Technology Ecosystem is its own full-time job.
            </h2>
          </div>
        </div>
      </section>

      {/* 3-Column Insight Cards Section */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {/* CARD 1 */}
            <article className="flex flex-col">
              {/* Image */}
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <img
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-549@2x.jpg"
                    alt="The Evolution of Channel Technology"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  The Evolution of Channel Technology
                </h3>
                <p className="text-base leading-relaxed">
                  More than ever, there is a tremendous market opportunity to capitalize
                  on additional growth and expand the addressable IT market. But it’s
                  not going to get there with the status quo.
                </p>
              </div>
            </article>

            {/* CARD 2 */}
            <article className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <img
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-553@2x.jpg"
                    alt="What is Driving New Tech Consumption Models?"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  What is Driving New Tech Consumption Models?
                </h3>
                <p className="text-base leading-relaxed">
                  Even before the pandemic, investment in cloud, security and IoT was on
                  the rise and in the last 18 months, that growth has been exponential.
                </p>
              </div>
            </article>

            {/* CARD 3 */}
            <article className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <img
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-551@2x-2.jpg"
                    alt="Discovering Simplicity in the Complex IoT Data Maturity Journey"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  Discovering Simplicity in the Complex IoT Data Maturity Journey
                </h3>
                <p className="text-base leading-relaxed">
                  The data maturity journey helps channel partners methodically move
                  their end users to extract and utilize data in business.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>
      {/* CTA Section (Tailwind, TSX-ready, no inline styles) */}
      <section className="w-full bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Heading + subtext */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl md:text-4xl leading-tight text-[#005758]">
              Let’s Achieve Great Outcomes
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              TD SYNNEX is the partner that helps unlock business results for all.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://www.tdsynnex.com/na/ca/become-a-customer/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide uppercase
                   border border-[#005758] text-[#005758] rounded-none
                   hover:bg-[#005758] hover:text-white transition-colors"
            >
              Become a Customer
            </a>

            <a
              href="https://www.tdsynnex.com/na/ca/become-a-vendor/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide uppercase
                   border border-[#005758] text-[#005758] rounded-none
                   hover:bg-[#005758] hover:text-white transition-colors"
            >
              Become a Vendor
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export const Default = Footer;
