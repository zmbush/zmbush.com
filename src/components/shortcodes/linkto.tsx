/* @jsx jsx */
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';

import { GetLinkDataQuery } from '../../../types/graphql-types';
import { jsx, css } from '../../util/emotionReact';

interface Props {
  href: string;
  children?: React.ReactNode;
}

const LinkTo = ({ href, children, ...props }: Props) => {
  const data = useStaticQuery<GetLinkDataQuery>(graphql`
    query GetLinkData {
      people: allPersonYaml {
        nodes {
          name
          ref
          url
        }
      }
      technologies: allTechnologyYaml {
        nodes {
          ref
          name
          url
          tagline
        }
      }
      organizations: allOrganizationYaml {
        nodes {
          ref
          name
          url
          tagline
        }
      }
    }
  `);
  const url = new URL(href, `http://relative_url`);
  const request = url.pathname.replace(/^\/+|\/+$/, ``);
  switch (url.protocol) {
    case `tech:`:
    case `technology:`: {
      const techNode = data.technologies.nodes.find((n) => n.ref === request);
      if (techNode) {
        return (
          <a href={techNode.url} title={techNode.tagline}>
            {children || techNode.name}
          </a>
        );
      }
      if (process.env.NODE_ENV === `production`) {
        throw new Error(`linkto: Could not find technology with ref ${request}`);
      }
      return (
        <b
          css={css`
            background-color: red;
          `}
        >
          TECHNOLOGY {url.hostname} NOT FOUND
        </b>
      );
    }
    case `person:`:
    case `partner:`: {
      const personNode = data.people.nodes.find((n) => n.ref === request);
      if (personNode) {
        return <a href={personNode.url}>{children || personNode.name}</a>;
      }
      if (process.env.NODE_ENV === `production`) {
        throw new Error(`linkto: Could not find person with ref ${request}`);
      }
      return (
        <b
          css={css`
            background-color: red;
          `}
        >
          PARTNER {url.hostname} NOT FOUND
        </b>
      );
    }
    case `Organization:`:
    case `job:`:
    case `org:`: {
      const OrganizationNode = data.organizations.nodes.find((n) => n.ref === request);
      if (OrganizationNode) {
        return (
          <a href={OrganizationNode.url} title={OrganizationNode.tagline}>
            {children || OrganizationNode.name}
          </a>
        );
      }
      if (process.env.NODE_ENV === `production`) {
        throw new Error(`linkto: Could not find Organization with ref ${request}`);
      }
      return (
        <b
          css={css`
            background-color: red;
          `}
        >
          COMPANY {url.hostname} NOT FOUND
        </b>
      );
    }
    case `http:`:
    case `https:`:
    case `mailto:`:
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    default:
      if (process.env.NODE_ENV === `production`) {
        throw new Error(`linkto: Unexpected protocol ${url.protocol} for ${href}`);
      }
      return (
        <b
          css={css`
            background-color: red;
          `}
        >
          UNEXPECTED PROTOCOL {url.protocol} for {href}
        </b>
      );
  }
};

export default LinkTo;
