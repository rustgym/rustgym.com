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

import larryPic from '../content/avatars/larry_avatar_400.jpg'
import zanePic from '../content/avatars/zane_avatar_400.jpg'
import markPic from '../content/avatars/mark_avatar_400.jpg'

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
              <h3 className="instructors-title">Leaders</h3>
              <div className="employee-container">
                <div className="employee">
                  <p>
                    <img className="employee-pic" src={larryPic} />
                  </p>
                  <p>
                    <div className="employee-name">Larry</div>
                  </p>
                </div>
                <div className="employee">
                  <p>
                    <img className="employee-pic"  src={zanePic} />
                  </p>
                  <p>
                    <div className="employee-name">Zane</div>
                  </p>
                </div>
                <div className="employee">
                  <p>
                    <img className="employee-pic" src={markPic} />
                  </p>
                  <p>
                    <div className="employee-name">Mark</div>
                  </p>
                </div>
              </div>
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
