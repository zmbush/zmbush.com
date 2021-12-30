import * as React from 'react';

import Article from '../core/article';

interface Props {
  data?: {
    file?: {
      mdx?: {
        frontmatter?: {
          heroImage?: {
            childImageSharp?: {
              gatsbyImageData?: any;
            };
          };
        };
      };
    };
  };
  children: React.ReactNode;
  pageContext: {
    frontmatter?: {
      title?: string;
      subtitle?: string;
      heroImageAlign?: `TOP` | `CENTER` | `BOTTOM`;
    };
  };
}

const DefaultLayout = ({ data, children, pageContext }: Props) => (
  <Article
    pageTitle={pageContext.frontmatter?.title}
    subtitle={pageContext.frontmatter?.subtitle}
    headerImg={data?.file?.mdx?.frontmatter?.heroImage}
    headerImgAlign={pageContext.frontmatter?.heroImageAlign}
  >
    {children}
  </Article>
);

export default DefaultLayout;
