import React, { JSX } from 'react';
import { ImageField, Field, Text, RichText, Image, withDatasourceCheck } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

export type TDThreeColCardProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Text: Field<string>;
    Col1Title: Field<string>;
    Col1Text: Field<string>;
    Col1Image: ImageField;
    Col2Title: Field<string>;
    Col2Text: Field<string>;
    Col2Image: ImageField;
    Col3Title: Field<string>;
    Col3Text: Field<string>;
    Col3Image: ImageField;
  };
};


const TDThreeColCard = (props: TDThreeColCardProps): JSX.Element => {
  return (
    <>
      <section className="w-full bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl md:text-4xl leading-tight text-[#005758]">
              <Text field={props.fields.Title} />
            </h2>

            <div className="max-w-3xl text-base md:text-lg leading-relaxed">
              <RichText field={props.fields.Text} />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <article className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <Image
                    field={props.fields.Col1Image}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  <Text field={props.fields.Col1Title} />
                </h3>
                <RichText field={props.fields.Col1Text} />
              </div>
            </article>
            <article className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <Image
                    field={props.fields.Col2Image}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  <Text field={props.fields.Col2Title} />
                </h3>
                <RichText field={props.fields.Col2Text} />
              </div>
            </article>
            <article className="flex flex-col">
              <div className="relative w-full overflow-hidden rounded">
                <div className="relative w-full pb-[60%]">
                  <Image
                    field={props.fields.Col3Image}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#005758]">
                  <Text field={props.fields.Col3Title} />
                </h3>
                <RichText field={props.fields.Col3Text} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export const Default = withDatasourceCheck()<TDThreeColCardProps>(TDThreeColCard);