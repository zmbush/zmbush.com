import { graphql } from 'gatsby';
import * as React from 'react';

import { Get404ImageQuery } from '../../types/graphql-types';
import Default from '../components/core/default';

interface Props {
  data: Get404ImageQuery;
}
const NotFoundPage = ({ data }: Props) => (
  <Default
    article
    pageTitle='There is nothing here'
    subtitle="I don't know what you were looking for, but it's not here"
    headerImg={data.image}
  >
    <p>
      This may refer to some deleted content, but is most likely a mistyped link. You might be able
      to find what you&apos;re looking for by checking the pages in the header. Apologies for the
      inconvenience.
    </p>
  </Default>
);

export const query = graphql`
  query Get404Image {
    image: file(relativePath: { eq: "404.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
  }
`;

export default NotFoundPage;
