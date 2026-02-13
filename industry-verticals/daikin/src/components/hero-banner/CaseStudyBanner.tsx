import React, { JSX } from "react";
import { Text, RichText, Image, Field, ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type CaseStudyProps = ComponentProps & {
  fields: {
    Title?: Field<string>;
    Location?: Field<string>;
    FacilitySize?: Field<string>;
    Issue?: Field<string>;
    Solution?: Field<string>;
    Image?: ImageField;
    ImageCaption?: Field<string>;
    CaseStudyType?: Field<string>;
  }
};

export const Default = (props: CaseStudyProps): JSX.Element => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] border border-gray-300 bg-white w-full">
      <figure className="flex flex-col border-b lg:border-b-0 lg:border-r border-gray-300">
        <div className="relative w-full min-h-70 bg-gray-100">
          <Image field={props.fields.Image} className="h-full w-full object-cover" />
        </div>

        <figcaption className="bg-gray-100 text-xs italic text-gray-800 px-3 py-2 border-t border-gray-300">
          <Text field={props.fields.ImageCaption} />
        </figcaption>
      </figure>

      <aside className="flex flex-col min-w-70">
        <header className="bg-gray-500 text-white text-center px-4 py-3">
          <div className="text-lg font-extrabold tracking-wide">CASE STUDY</div>
          <div className="text-sm font-semibold opacity-95"><Text field={props.fields.CaseStudyType} /></div>
        </header>

        {/* Body */}
        <div className="p-4 space-y-4">
          <div className="text-sm font-extrabold text-[#009fde]">Facility at a glance</div>

          <dl className="space-y-3 text-sm">
            <div className="grid grid-cols-[110px_1fr] gap-2">
              <dt className="font-extrabold text-[#009fde]">Name</dt>
              <dd className="text-gray-900">
                <Text field={props.fields.Title} />
              </dd>
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-2">
              <dt className="font-extrabold text-[#009fde]">Location</dt>
              <dd className="text-gray-900">
                <Text field={props.fields.Location} />
              </dd>
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-2">
              <dt className="font-extrabold text-[#009fde]">Facility size</dt>
              <dd className="text-gray-900">
                <Text field={props.fields.FacilitySize} />
              </dd>
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-2">
              <dt className="font-extrabold text-[#009fde]">Issue</dt>
              <dd className="text-gray-900 leading-snug">
                <RichText field={props.fields.Issue} />
              </dd>
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-2">
              <dt className="font-extrabold text-[#009fde]">Solution</dt>
              <dd className="text-gray-900 leading-snug">
                <RichText field={props.fields.Solution} />
              </dd>
            </div>
          </dl>
        </div>
      </aside>
    </section>
  );
};
