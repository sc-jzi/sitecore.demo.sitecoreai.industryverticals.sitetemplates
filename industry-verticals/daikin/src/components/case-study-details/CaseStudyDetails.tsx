import { ComponentProps } from '@/lib/component-props';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Placeholder,
  Field,
} from '@sitecore-content-sdk/nextjs';
import { Bookmark } from 'lucide-react';
import { useI18n } from 'next-localization';
import SocialShare from '../non-sitecore/SocialShare';

interface CaseStudyDetailsProps extends ComponentProps {
  fields: {
    Title: Field<string>;
    IssueDetail: Field<string>;
    SolutionDetail: Field<string>;
    OutcomeDetail: Field<string>;
  }
}

export const Default = ({ params, fields, rendering }: CaseStudyDetailsProps) => {
  const { styles, RenderingIdentifier: id } = params;
  const { t } = useI18n();

  return (
    <div className={`w-full space-y-6 py-6 ${styles}`} id={id}>
      <article className="container">
        <div className="mx-auto max-w-4xl space-y-6">

          <h1 className="text-[#009fde]">
            <ContentSdkText field={fields?.Title} />
          </h1>

          <div className="flex gap-4">
            <SocialShare
              url="#"
              title={fields?.Title?.value || ''}
            />
            <button className="simple-btn">
              <Bookmark />
              {t('save_label') || 'Save'}
            </button>
          </div>

          <div>
            <div>
              <h2 className="text-[#009fde]">
                Issues
              </h2>
              <ContentSdkRichText field={fields?.IssueDetail} />
            </div>
            <div>
              <h2 className="text-[#009fde]">
                Solution
              </h2>
              <ContentSdkRichText field={fields?.SolutionDetail} />
            </div>
            <div>
              <h2 className="text-[#009fde]">
                Solution
              </h2>
              <ContentSdkRichText field={fields?.SolutionDetail} />
            </div>
          </div>
        </div>
      </article>

      <Placeholder rendering={rendering} name="case-study-placeholder" />

    </div>
  );
};