/* @jsx jsx */
import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-400.css';
import { MDXProvider } from '@mdx-js/react';
import { ImageDataLike } from 'gatsby-plugin-image';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { jsx, css } from '../../util/emotionReact';
import getSiteMetadata from '../../util/get-site-metadata';
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
  if (preProps?.children?.props?.mdxType === `code`) {
    // we have a <pre><code> situation
    const { children: codeString, className = ``, ...props } = preProps.children.props;

    const match = className.match(/language-([\0-\uFFFF]*)/);

    return {
      codeString,
      className,
      language: match != null ? match[1] : ``,
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
  p: (pProps: any) => {
    if (pProps?.children?.props?.mdxType === `pre`) {
      return shortCodes.pre(pProps.children.props);
    }
    return <p {...pProps} />;
  },
  pre: (preProps: any) => {
    const props = preToCodeBlock(preProps);
    if (props) {
      return <CodeSnippet {...props} />;
    }
    return <pre {...preProps} />;
  },
  inlineCode: ({ children }: { children: string }) => <CodeSnippet inline codeString={children} />,
};

interface Props {
  pageTitle?: string;
  hideTitle?: boolean;
  subtitle?: string;
  technologies?: React.ReactNode;
  date?: string;
  headerImg?: {
    childImageSharp?: {
      gatsbyImageData?: any | null;
    } | null;
  } | null;
  headerImgAlign?: `TOP` | `CENTER` | `BOTTOM`;
  children: React.ReactNode;
  className?: string;
}

const Default = ({
  pageTitle,
  hideTitle,
  children,
  headerImg,
  headerImgAlign,
  subtitle,
  technologies,
  date,
  className,
}: Props) => {
  const { title } = getSiteMetadata();
  return (
    <Base>
      <MDXProvider components={shortCodes}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>{`${pageTitle || ``}${title ? ` | ${title}` : ``}`}</title>
        </Helmet>
        <Navbar />
        {hideTitle ? null : (
          <Header
            title={pageTitle}
            subtitle={subtitle}
            technologies={technologies}
            date={date}
            headerImg={headerImg as ImageDataLike}
            headerImgAlign={headerImgAlign}
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

            p,
            div.gatsby-highlight,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            div.toc {
              ${theme.breakpoints.down(`article`)} {
                margin-left: 1rem;
                margin-right: 1rem;
              }
            }

            > p:first-of-type,
            .with-big-letter > p:first-of-type {
              text-indent: 0;

              &::first-letter {
                color: ${theme.colors.primary.base};
                float: left;
                font-size: 200%;
                font-weight: 300;
                line-height: 1;
              }
            }

            p {
              text-indent: 2.5rem;
              margin-top: 1rem;
              margin-bottom: 1rem;
              line-height: 1.5;
            }

            img {
              ${theme.breakpoints.down(`sm`)} {
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
