import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import Img from 'gatsby-image';
import chunk from 'lodash/fp/chunk';
import circle from 'uswds_images/circle-124.png';
import Layout from '../components/layout';

// useHelmetTags hook uses the uri and callout.title and uses them to
// provide accurate information to the <Helmet>'s <title> and <html> tags
export const useHelmetTags = (uri, callout) => {
  const [title, setTitle] = React.useState('Census for All');
  const [language, setLanguage] = React.useState('en');
  React.useEffect(
    () => {
      if (callout) setTitle(callout.title);
      if (uri !== '/') setLanguage(uri.substring(1).split('/')[0]);
    },
    [callout, uri]
  );

  return { title, language };
};

const Index = ({ news, yml, heroImg, uri, location }) => {
  const { callout, media, section, tagline, layout } = yml;
  const { title, language } = useHelmetTags(uri, callout);
  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{title}</title>
      </Helmet>
      <Layout language={language} location={location}>
        <section className="usa-hero">
          <Img fluid={heroImg} className="usa-hero__image" fadeIn={false} />
          <div className="grid-container">
            <div className="usa-hero__callout">
              <h2 className="usa-hero__heading">{callout.title}</h2>
              <p>{callout.text}</p>
              <Link className="usa-button" to={callout.cta.link}>
                {callout.cta.text}
              </Link>
            </div>
          </div>
        </section>

        <section className="grid-container usa-section">
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
                {tagline.title}
              </h2>
            </div>
            <div className="tablet:grid-col-8 usa-prose">
              {tagline.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="grid-container usa-section">
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
                {layout.latestNews}
              </h2>
            </div>
            <div className="tablet:grid-col-8 usa-prose">
              <ul>
                {news.map((
                  newsPost,
                  i // Make this actaully link //   TODO               //
                ) => (
                  <li
                    key={`news-${i}`}
                    style={{ color: 'blue', textDecoration: 'underline' }}
                  >
                    <h2 className="font-heading-l margin-top-0">
                      {newsPost.frontmatter.title}
                    </h2>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="usa-graphic-list usa-section usa-section--dark">
          <div className="grid-container">
            {chunk(2, media).map((pairs, idx) => (
              <div
                key={idx}
                className="usa-graphic-list__row grid-row grid-gap"
              >
                {pairs.map(({ title, text }, idx) => (
                  <div key={idx} className="usa-media-block tablet:grid-col">
                    <img
                      className="usa-media-block__img"
                      src={circle}
                      alt="circle"
                    />
                    <div className="usa-media-block__body">
                      <h3 className="usa-graphic-list__heading">{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="usa-section">
          <div className="grid-container">
            <h2 className="font-heading-xl margin-y-0">{section.title}</h2>
            <p className="usa-intro">{section.text}</p>
            <Link className="usa-button usa-button--big" to={section.cta.link}>
              {section.cta.text}
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Index;
