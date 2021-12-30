/* eslint-disable max-classes-per-file */
import { getImage } from 'gatsby-plugin-image';
import React from 'react';

type V<T> = T | Array<T>;

class Node<Fields> {
  name: string = `UNSET`;

  protected d: Fields;

  constructor(data: Fields) {
    this.d = data;
  }

  get innerData() {
    return this.d;
  }

  rootData() {
    return {
      '@context': `http://schema.org/`,
      ...this.data(),
    };
  }

  private static resolveData(v: any): any {
    if (typeof v === `object` && v instanceof Node) {
      return v.data();
    }
    if (Array.isArray(v)) {
      return v.map(this.resolveData);
    }
    return v;
  }

  data() {
    return {
      '@type': this.name,
      ...Object.fromEntries(Object.entries(this.d).map(([k, v]) => [k, Node.resolveData(v)])),
    };
  }

  render() {
    return React.createElement(
      `script`,
      { type: `application/ld+json` },
      JSON.stringify(this.rootData(), null, 2),
    );
  }
}

interface WebPageData {
  [`@id`]?: string;
}
export class WebPage extends Node<WebPageData> {
  name: string = `WebPage`;
}

interface PersonData {
  name?: V<string>;
  url?: V<string>;
}
export class Person extends Node<PersonData> {
  name: string = `Person`;
}

type ArticleSourceData = {
  frontmatter?: {
    heroImage?: { childImageSharp?: { gatsbyImageData: any } | null } | null;
  } | null;
  fields: {
    source: string;
    slug: string;
    title: string;
    date: Date;
  };
};

interface ArticleData {
  mainEntityOfPage?: V<WebPage>;
  author?: V<Person>;
  headline?: V<string>;
  image?: V<string>;
  datePublished?: V<Date>;
}
export class Article extends Node<ArticleData> {
  name: string = `Article`;

  static fromData(siteUrl: string, { frontmatter, fields }: ArticleSourceData): Article {
    const img = getImage(frontmatter?.heroImage?.childImageSharp?.gatsbyImageData);
    return new Article({
      mainEntityOfPage: new WebPage({
        '@id': `${siteUrl}/${fields.source}/${fields.slug}`,
      }),
      author: new Person({
        name: `Zach Bush`,
        url: siteUrl || undefined,
      }),
      headline: fields.title,
      image: img?.images?.fallback?.src ? `${siteUrl}${img?.images?.fallback?.src}` : undefined,
      datePublished: fields.date,
    });
  }
}

class BlogPosting extends Article {
  name: string = `BlogPosting`;

  static fromData(siteUrl: string, sourceData: ArticleSourceData): BlogPosting {
    return new BlogPosting(Article.fromData(siteUrl, sourceData).innerData);
  }
}

interface BlogData {
  blogPost?: V<BlogPosting>;
  author?: V<Person>;
  mainEntityOfPage?: V<WebPage>;
}
export class Blog extends Node<BlogData> {
  name: string = `Blog`;

  static fromData(siteUrl: string, subPage: string, articles: Array<ArticleSourceData>): Blog {
    return new Blog({
      blogPost: articles.map((article) => BlogPosting.fromData(siteUrl, article)),
      mainEntityOfPage: new WebPage({
        '@id': `${siteUrl}/${subPage}`,
      }),
      author: new Person({
        name: `Zach Bush`,
        url: siteUrl || undefined,
      }),
    });
  }
}
