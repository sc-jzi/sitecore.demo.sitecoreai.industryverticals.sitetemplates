import React, { JSX } from 'react';
import { ImageField, Field, Text, Image, withDatasourceCheck } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

export type TDImageSectionProps = ComponentProps & {
  fields: {
    Images: [{
      fields: {
        Title: Field<string>;
        Image: ImageField;
      }
    }]
  };
};

const TDImageSection = (props: TDImageSectionProps): JSX.Element => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {props.fields.Images.map((image, index) => (
            <div className="flex flex-col items-center text-center" key={index}>
              <div className="relative overflow-hidden">
                <div className="relative w-[151px] pb-[100%]">
                  <Image field={image.fields.Image} className="absolute inset-0 h-full w-full object-contain" />
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#005758] leading-tight">
                <Text field={image.fields.Title} />
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<TDImageSectionProps>(TDImageSection);