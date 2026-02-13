import { useState, useEffect, useCallback, JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps } from 'lib/component-props';
import {
  NextImage,
  Field,
  Link,
  withDatasourceCheck,
  Text,
  ImageField
} from '@sitecore-content-sdk/nextjs';

export type HeroCarouselProps = ComponentProps & {
  fields: {
    Slides: [{
      fields: {
        Title: Field<string>;
        Subtitle: Field<string>;
        Eyebrow: Field<string>;
        Image: ImageField;
        CTA: {
          value: {
            anchor: string;
            href: string;
            linktype: string;
            target: string;
            text: string;
          };
        };
      };
    }];
  };
};

export const HeroCarousel = (props: HeroCarouselProps): JSX.Element => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % props.fields.Slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + props.fields.Slides.length) % props.fields.Slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-128 md:h-144 overflow-hidden w-full">
      {props.fields.Slides.map((slide, index) => (
        <div
          key={slide.fields.Title.value}
          className={`absolute inset-0 transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <NextImage field={slide.fields.Image} className="w-full min-w-full" />
          <div className="absolute inset-0 bg-[#221f20]/60" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-background/80 mb-3 block">
              <Text field={props.fields.Slides[current].fields.Eyebrow} />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-background text-balance leading-tight">
              <Text field={props.fields.Slides[current].fields.Title} />
            </h2>
            <p className="mt-4 text-background/90 leading-relaxed max-w-lg">
              <Text field={props.fields.Slides[current].fields.Subtitle} />
            </p>

            <Link field={props.fields.Slides[current].fields.CTA} className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-primary/90 transition-colors" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="p-2 text-background/80 hover:text-background transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {props.fields.Slides.map((slide, index) => (
            <button
              key={slide.fields.Title.value}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${index === current ? "w-8 bg-background" : "w-2 bg-background/40"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="p-2 text-background/80 hover:text-background transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

export const Default = withDatasourceCheck()<HeroCarouselProps>(HeroCarousel);