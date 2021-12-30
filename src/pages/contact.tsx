/* @jsx jsx */
import { graphql } from 'gatsby';
import { FaGithub, FaKeybase, FaLinkedin } from 'react-icons/fa';

import { ContactImageQuery } from '../../types/graphql-types';
import Article from '../components/core/article';
import { css, jsx } from '../util/emotionReact';
import theme from '../util/theme';

interface Props {
  data: ContactImageQuery;
}
const Contact = ({ data }: Props) => (
  <Article pageTitle='Get in Touch' headerImg={data.file} headerImgAlign='TOP'>
    <div
      css={css`
        text-align: center;
        a {
          color: ${theme.colors.text.primary.lighten(1.5)};
          text-decoration: none;
          padding: 1rem;
          transition: color 0.25s ease;
          position: relative;

          &:before {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            width: 0%;
            transition: width 0.25s ease;
            border-bottom: 0.2rem solid ${theme.colors.text.primary()};
          }

          svg {
            transition: transform 0.25s ease;
          }

          &:hover {
            color: ${theme.colors.text.primary()};
            &:before {
              width: 100%;
            }
            svg {
              transform: scale(1.1);
            }
          }
        }
      `}
    >
      <a href='https://github.com/zmbush'>
        <FaGithub size='90px' />
      </a>
      <a href='https://keybase.io/zmbush'>
        <FaKeybase size='90px' />
      </a>
      <a href='https://linkedin.com/in/zmbush'>
        <FaLinkedin size='90px' />
      </a>
    </div>
  </Article>
);

export const query = graphql`
  query ContactImage {
    file(relativePath: { eq: "foggy-bridge.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;

export default Contact;
