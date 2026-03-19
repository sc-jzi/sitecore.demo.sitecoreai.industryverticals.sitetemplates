import { ComponentProps } from '@/lib/component-props';
import {
  Field,
  ImageField,
  RichTextField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Placeholder,
  useSitecore,
  TextField,
  DateField,
} from '@sitecore-content-sdk/nextjs';
import { Calendar, Clock, Heart, Share2 } from 'lucide-react';
import { newsDateFormatter } from '../../helpers/dateHelper';
import SocialShare from '../non-sitecore/SocialShare';
import { useEffect, useState } from 'react';

interface AuthorFields {
  fields: {
    AuthorName: TextField;
    About: Field<string>;
    Avatar: ImageField;
  };
}

interface CategoryFields {
  fields: {
    Category: TextField;
  };
}

interface Fields {
  Title: Field<string>;
  ShortDescription: Field<string>;
  Content: RichTextField;
  Image: ImageField;
  PublishedDate: Field<string>;
  Author: AuthorFields;
  ReadTime: TextField;
  Likes: TextField;
  Shares: TextField;
  Category: CategoryFields;
}

interface ArticleDetailsProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: ArticleDetailsProps) => {
  const { page } = useSitecore();
  const [currentUrl, setCurrentUrl] = useState('');
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!fields?.Title) {
    return isPageEditing ? (
      <div className={`component article-details ${styles}`} id={id}>
        [ARTICLE DETAILS]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <>
      {/* Article Header */}
      <article className="container">
        <div className="mx-auto max-w-4xl">
          {/* Article Meta */}
          <div className="mb-6">
            {/* Title Section */}
            <div>
              <h1 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                <ContentSdkText field={fields?.Title} />
              </h1>
            </div>

            {/* Meta data Section */}
            <div className="text-foreground-muted mb-6 flex flex-wrap items-center gap-6 text-sm">
              {(fields?.PublishedDate?.value || isPageEditing) && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <DateField
                    tag="p"
                    className="news-date"
                    field={fields?.PublishedDate}
                    render={newsDateFormatter}
                  />
                </div>
              )}
              {(fields?.ReadTime?.value || isPageEditing) && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    <ContentSdkText field={fields?.ReadTime} />
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 border-y py-4 md:flex md:flex-row md:items-center md:justify-between">

              {/* Social Actions */}
              <SocialShare
                useCustomIcons
                url={currentUrl}
                title={fields?.Title?.value || ''}
                description={fields?.ShortDescription?.value || ''}
                mediaUrl={fields?.Image?.value?.src || ''}
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <ContentSdkImage
              field={fields?.Image}
              className="h-64 w-full rounded-lg object-cover md:h-96"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg mb-12 max-w-none">
            <div className="space-y-6 leading-relaxed text-gray-700">
              <ContentSdkRichText field={fields?.Content} />
            </div>
          </div>
        </div>
      </article>

      <div className="container">
        <div className="mx-auto max-w-232">
          <Placeholder rendering={rendering} name="article-detail" />
        </div>
      </div>

    </>
  );
};
