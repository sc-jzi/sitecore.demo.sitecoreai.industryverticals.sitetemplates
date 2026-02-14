import React from 'react';
import HomeHighlighted from '../non-sitecore/search/HomeHighlighted';
import { HIGHLIGHTED_ARTICLES_RFKID } from '@/constants/search';

export const SearchResultsComponent = () => {


};

export const Default = () => {
  return (
    <HomeHighlighted rfkId={HIGHLIGHTED_ARTICLES_RFKID} />
  );
};