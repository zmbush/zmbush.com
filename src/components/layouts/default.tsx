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
    frontmatter: {
      title: string;
    };
  };
}

const DefaultLayout = ({ data, children, pageContext }: Props) => (
  <Article
    pageTitle={pageContext.frontmatter.title}
    headerImg={data?.file?.mdx?.frontmatter?.heroImage}
  >
    {children}
  </Article>
);

export default DefaultLayout;
