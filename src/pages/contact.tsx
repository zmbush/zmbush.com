/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaKeybase } from '@react-icons/all-files/fa/FaKeybase';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import { graphql } from 'gatsby';

import { ContactImageQuery } from '../../types/graphql-types';
import Default from '../components/default';

interface Props {
  data: ContactImageQuery;
}
const Contact = ({ data }: Props) => (
  <Default article pageTitle='Get in Touch' headerImg={data.file}>
    <div
      css={css`
        text-align: center;
        a {
          color: #444444;
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
            border-bottom: 0.2rem solid #212121;
          }

          svg {
            transition: transform 0.25s ease;
          }

          &:hover {
            color: #212121;
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
  </Default>
);

export const query = graphql`
  query ContactImage {
    file(relativePath: { eq: "foggy-bridge.jpg" }) {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
  }
`;

export default Contact;
