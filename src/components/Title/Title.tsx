import * as React from 'react';

import './title.css';
import { titleStyle } from './titleStyle';

export const Title: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <h1 className={titleStyle.title}>Welcome to postcss-typescript-css!</h1>
      <h3 className={titleStyle.titleDescription}>This is an example using the plugin with webpack 2, React, TypeScript and PostCSS</h3>
    </div>
  );
};
