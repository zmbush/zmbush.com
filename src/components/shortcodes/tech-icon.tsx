/* @jsx jsx */
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import { DiRuby } from 'react-icons/di';
import { FaRust, FaPython, FaNodeJs, FaReact, FaJava } from 'react-icons/fa';
import { SiAseprite, SiMaterialui } from 'react-icons/si';

import { GetTechIconDataQuery } from '../../../types/graphql-types';
import { jsx, css } from '../../util/emotionReact';

import BevyIcon from './icons/bevy.svg';
import TiledIcon from './icons/tiled.svg';

interface Props {
  refName: string;
}

const IcoWrap =
  (C: typeof BevyIcon) =>
  ({ size, color, title, children, style, ...svgProps }: IconBaseProps) =>
    (
      <C
        stroke='currentColor'
        fill='currentColor'
        strokeWidth='0'
        {...svgProps}
        style={{ color, ...style }}
        height={size || undefined}
        width={size || undefined}
      >
        {title && <title>{title}</title>}
        {children}
      </C>
    );

const icons: { [key: string]: IconType } = {
  java: FaJava,
  node: FaNodeJs,
  python: FaPython,
  ruby: DiRuby,
  rust: FaRust,

  mui: SiMaterialui,
  react: FaReact,

  aseprite: SiAseprite,
  bevy: IcoWrap(BevyIcon),
  tiled: IcoWrap(TiledIcon),
};

const TechIcon = ({ refName }: Props) => {
  const rawData = useStaticQuery<GetTechIconDataQuery>(graphql`
    query GetTechIconData {
      technologies: allTechnologyYaml {
        nodes {
          ref
          name
          url
          tagline
        }
      }
    }
  `);
  const data = Object.fromEntries(rawData.technologies.nodes.map((t) => [t.ref, t]));
  const entry = data[refName];

  let icon: React.ReactNode;
  if (refName in icons) {
    const Ico = icons[refName];
    icon = <Ico size='1em' />;
  } else {
    icon = <b>Unknown {refName}</b>;
  }
  if (entry) {
    return (
      <a
        css={css`
          display: inline-block;
          color: inherit;
          margin-right: 1rem;

          &:last-of-type {
            margin-right: 0;
          }
        `}
        href={entry.url}
        title={entry.tagline}
      >
        {icon}
      </a>
    );
  }
  if (process.env.NODE_ENV === `production`) {
    throw new Error(`tech-icon: Could not find icon for: ${refName}`);
  }
  return (
    <b
      css={css`
        color: red;
        font-weight: bold;
      `}
    >
      NO ICON FOUND FOR {refName}
    </b>
  );
};

export default TechIcon;
