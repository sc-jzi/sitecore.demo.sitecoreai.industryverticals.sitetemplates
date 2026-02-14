import React, { JSX } from 'react';
import HomeHighlighted from '../non-sitecore/search/HomeHighlighted';
import { HIGHLIGHTED_ARTICLES_RFKID } from '@/constants/search';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import { ComponentProps } from 'lib/component-props';

export type HighlightedCaseStudiesProps = ComponentProps & {
  params: { [key: string]: string };
};

export const HighlightedCaseStudies = (props: HighlightedCaseStudiesProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;
  const widget = HIGHLIGHTED_ARTICLES_RFKID;

  return (
    <div className={`col-12 ${sxaStyles}`}>
      <HomeHighlighted rfkId={widget} />
    </div>
  );
};

export const Default = HighlightedCaseStudies;
