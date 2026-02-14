import React, { JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <>
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#005758]">
              Empowering Technology Partners
            </h1>

            <p className="max-w-3xl text-base md:text-lg leading-relaxed">
              Technology moves fast. We partner with the entire technology ecosystem
              to manage relentless transformation, execute confidently, and evolve to
              capture opportunities up ahead.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative overflow-hidden">
                <div className="relative w-[151px] pb-[100%]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-547.png"
                    alt="Technology Solutions"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#005758] leading-tight">
                Technology<br />Solutions
              </h3>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative overflow-hidden">
                <div className="relative w-[150px] pb-[100%]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-569.png"
                    alt="Business Services"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#005758] leading-tight">
                Business<br />Services
              </h3>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative overflow-hidden">
                {/* Original image was 169x151 => padding-bottom ~ 89.3491% */}
                <div className="relative w-[169px] pb-[89.3491%]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-546.png"
                    alt="Digital Platforms"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#005758] leading-tight">
                Digital<br />Platforms
              </h3>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative overflow-hidden">
                <div className="relative w-[151px] pb-[100%]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-544.png"
                    alt="Technology Education"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#005758] leading-tight">
                Technology<br />Education
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const Default = Footer;