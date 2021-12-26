/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-400.css';
import { MDXProvider } from '@mdx-js/react';
import { graphql, useStaticQuery } from 'gatsby';
import { ImageDataLike } from 'gatsby-plugin-image';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { GetSiteTitleQuery } from '../../../types/graphql-types';
import theme from '../../util/theme';
import Caption from '../shortcodes/caption';
import CodeSnippet from '../shortcodes/code-snippet';
import LinkTo from '../shortcodes/linkto';
import Toc from '../shortcodes/toc';

import Base from './base';
import Footer from './footer';
import Header from './header';
import Navbar from './navbar';

const preToCodeBlock = (preProps: any) => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === 'code'
  ) {
    // we have a <pre><code> situation
    const { children: codeString, className = '', ...props } = preProps.children.props;

    const match = className.match(/language-([\0-\uFFFF]*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: match != null ? match[1] : '',
      ...props,
    };
  }
  return undefined;
};

const shortCodes = {
  Toc,
  Caption,
  LinkTo,
  a: LinkTo,
  pre: (preProps: any) => {
    const props = preToCodeBlock(preProps);
    if (props) {
      return <CodeSnippet {...props} />;
    }
    return <pre {...preProps} />;
  },
};

interface Props {
  pageTitle: string;
  hideTitle?: boolean;
  subtitle?: string;
  technologies?: React.ReactNode;
  date?: string;
  headerImg?: {
    childImageSharp?: {
      gatsbyImageData?: any | null;
    } | null;
  } | null;
  children: React.ReactNode;
  className?: string;
}

const Default = ({
  pageTitle,
  hideTitle,
  children,
  headerImg,
  subtitle,
  technologies,
  date,
  className,
}: Props) => {
  const data = useStaticQuery<GetSiteTitleQuery>(graphql`
    query GetSiteTitle {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const metadata = data.site?.siteMetadata || {};
  return (
    <Base>
      <MDXProvider components={shortCodes}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>
            {pageTitle}
            {metadata.title ? ` | ${metadata.title}` : ''}
          </title>
        </Helmet>
        <Navbar />
        {hideTitle ? null : (
          <Header
            title={pageTitle}
            subtitle={subtitle}
            technologies={technologies}
            date={date}
            headerImg={headerImg as ImageDataLike}
          />
        )}
        <article
          className={className}
          css={css`
            &:before,
            &:after {
              content: '';
              display: table;
            }

            &:after {
              clear: both;
            }

            a {
              text-decoration: none;
              font-weight: 400;
              color: ${theme.colors.primary.base};

              &:hover {
                text-decoration: underline;
              }
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              > a {
                color: inherit;
                font-weight: inherit;
              }
            }

            > {
              p,
              div.gatsby-highlight,
              h1,
              h2,
              h3,
              h4,
              h5,
              h6,
              div.toc {
                ${theme.breakpoints.down('article')} {
                  margin-left: 1rem;
                  margin-right: 1rem;
                }
              }
            }

            > p {
              &:first-of-type {
                text-indent: 0;

                &::first-letter {
                  color: ${theme.colors.primary.base};
                  float: left;
                  font-size: 4.3rem;
                  font-weight: 300;
                  line-height: 1;
                }
              }

              text-indent: 2.5rem;
              margin-bottom: 1rem;
            }

            p {
              margin-top: 1rem;
              line-height: 1.5;
            }

            img {
              ${theme.breakpoints.down('sm')} {
                width: 100%;
                height: auto;
              }
            }

            ol,
            ul {
              // negative hanging indent for first line
              text-indent: -3rem;
              padding-left: 3rem;
            }

            ol li {
              counter-increment: step-counter;

              &::before {
                content: counter(step-counter) '. ';
                margin-right: 0.5rem;
                margin-left: 1rem;
                font-size: 1.5rem;
              }
            }

            em {
              font-style: italic;
            }

            strong {
              font-weight: bold;
            }

            .gatsby-resp-image-figcaption {
              text-align: center;
              display: block;
              padding-bottom: 2rem;
              margin-top: 0.5rem;
              font-style: italic;
            }
          `}
        >
          {children}
        </article>
        <Footer />
      </MDXProvider>
    </Base>
  );
};

export default Default;
