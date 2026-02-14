import React, { JSX } from 'react';

const Footer = (): JSX.Element => {
  return (
    <>
      <section className="w-full bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl md:text-4xl leading-tight text-[#005758]">
              Compelling Technology Solutions
            </h2>

            <p className="max-w-3xl text-base md:text-lg leading-relaxed">
              We’re intent on the success of our partners from edge-to-cloud.
              TD SYNNEX brings together the most well-known names in IT and emerging
              technology innovators supported by 22,000 co-workers around the world.
            </p>
          </div>
        </div>
      </section>
      {/* Solutions Grid Section */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {/* COLUMN 1 */}
            <article className="flex flex-col">
              {/* Image */}
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <img
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-394@2x.jpg"
                    alt="Edge Solutions"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  Edge Solutions
                </h3>

                <ul className="list-disc pl-5 space-y-2">
                  <li>PC</li>
                  <li>Mobile</li>
                  <li>Print</li>
                  <li>Consumer electronics</li>
                  <li>AR/VR</li>
                  <li>Endpoint security</li>
                  <li>Wearables</li>
                  <li>Endpoint software</li>
                </ul>
              </div>
            </article>

            {/* COLUMN 2 */}
            <article className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <img
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-393@2x.jpg"
                    alt="Advanced Solutions"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  Advanced Solutions
                </h3>

                <ul className="list-disc pl-5 space-y-2">
                  <li>Infrastructure</li>
                  <li>Hybrid cloud</li>
                  <li>Data</li>
                  <li>Security</li>
                  <li>Networking</li>
                  <li>Software</li>
                </ul>
              </div>
            </article>

            {/* COLUMN 3 */}
            <article className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <img
                    src="https://www.tdsynnex.com/na/ca/wp-content/uploads/sites/2/2022/09/Group-392@2x.jpg"
                    alt="Specialized Solutions and Services"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  Specialized Solutions and Services
                </h3>

                <ul className="list-disc pl-5 space-y-2">
                  <li>Components</li>
                  <li>Lifecycle</li>
                  <li>CAD</li>
                  <li>Implementation</li>
                  <li>Consultancy</li>
                  <li>Professional audio visual</li>
                  <li>Education</li>
                  <li>Hyper scaler infrastructure</li>
                </ul>
              </div>
            </article>

          </div>
        </div>
      </section>
    </>
  );
};

export const Default = Footer;