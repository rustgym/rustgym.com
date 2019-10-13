import { Global } from '@emotion/core';
import * as React from 'react';
import Helmet from 'react-helmet';
import {GlobalStyles} from '../styles/global';
// @ts-ignore
import favicon from '../../src/favicon.ico';

interface IndexProps {
  className?: string;
}

const IndexLayout: React.FC<IndexProps> = props => {
  return (
    <div className={props.className}>
      <Helmet>
        <link rel="icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <Global styles={GlobalStyles} />
      {props.children}
    </div>
  );
};

export default IndexLayout;
