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


const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
  .employee-pic {
    border-radius: 100%;
    height: 250px;
    width: auto;
    margin-bottom: 0;
  }
  .employee {
    display:flex;
    flex:2;
    flex-wrap: wrap;
    width: 300px;
  }
  .employee-container {
    display: flex;
  }
  .employee-name, .employee-title {
    text-align: center;
  }
  .employee-title {
    font-style: italic;
  }
  .instructors-title {
    text-align: center;
    margin-bottom: 30px;
  }
`;


const Discord: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>Discord</title>
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
            <PostFullTitle>Discord: Talk to Us!</PostFullTitle>
          </PostFullHeader>
          <div style={{textAlign: "center"}}>
            <iframe
              src="https://discordapp.com/widget?id=629047160457003040&theme=dark"
              width="350"
              height="500"
              allowTransparency={true}
              frameBorder="0">
            </iframe>
          </div>
          <PostFullContent className="post-full-content">
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default Discord;

