import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';
import { graphql, StaticQuery, Link  } from 'gatsby';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;

interface SiteNavLogoProps {
  logo?: {
    childImageSharp: {
      fixed: any;
    };
  };
}
const profilePic = () => (
  <StaticQuery
    query={graphql`
      query ProfileQuery {
        zane: file(relativePath: { eq: "img/zane.png" }) {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    // tslint:disable-next-line:react-this-binding-issue
    render={(data: SiteNavLogoProps) => (
      <Link className="site-nav-logo" css={ProfilePhotoStyles} to="/">
        {data.logo ? (
          <img src={data.logo.childImageSharp.fixed.src} />
        ) : (
          config.title
        )}
      </Link>
    )}
  />)
const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>
          <SiteNav />
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>About</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                Rust Gym is a self funded company who saw the developer training process was broken, so we came together to find the best way to fix it. We have varying backgrounds, but we’ve all worked for startups, big corporations (Verizon, Amazon, Capital One, etc.), and the U.S. government, which is where we met.
              </p>
              <p>
                We believe empowering developers is the only real way forward, and hands on training is the most effective way to do it. We believe self driven coders are the only ones who will truly be successful, but even self driven people need a helping hand now and again.
              </p>
              {/* <div css={ProfileCSS}>
              </div> */}
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
