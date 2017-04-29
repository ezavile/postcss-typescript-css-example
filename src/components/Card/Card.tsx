import * as React from 'react';
import { Title } from '../Title/Title';

import './card.postcss';
import { cardStyle } from './cardStyle';

export const Card: React.StatelessComponent<{}> = () => {
  return (
    <article className={cardStyle.card}>
      <header className={cardStyle.cardHeader}>
        <Title />
      </header>
      <div className={cardStyle.cardContent}>
        <h2>How to use the plugin</h2>
        <hr />
        <p>This project has two components Card and Title. Each component has its own style file. The Card Component is using <b>postcss-modules.</b></p>

        <h3>Title Component</h3>
        <h5>title.css (I am using cssnext)</h5>
        <pre className={cardStyle.cardContentCode}>
          <span className={cardStyle.cardContentClassnameCss}>
            .Title {'{'}
            <br/>
            <span className={cardStyle.cardContentAttrCss}>
              {'  '}color: #444;
              <br/>
              {'  '}margin: 0;
              <br/>

              <span className={cardStyle.cardContentClassnameCss}>
                {'  '}&-description  {'{'}
                <br/>
                <span className={cardStyle.cardContentAttrCss}>
                  {'    '}color: #acb2b5;
                  <br/>
                  {'    '}margin-bottom: 0;
                  <br/>
                </span>
                {'    }'}
              </span>
              <br/>
            </span>
             {'}'}
          </span>
        </pre>
        <h5>Title.tsx</h5>
        <pre className={cardStyle.cardContentCode}>
          <span className={cardStyle.cardContentReserverdWordTs}>import </span>
          <span className={cardStyle.cardContentStringTs}> './title.css'</span>;
          <br/>
          <span className={cardStyle.cardContentReserverdWordTs}>import </span>
          {'{'} titleStyle {'}'}
          <span className={cardStyle.cardContentReserverdWordTs}> from </span>
          <span className={cardStyle.cardContentStringTs}> './titleStyle'</span>;
        </pre>
        <p>So, titleStyle is an object with two properties: </p>
        <pre className={cardStyle.cardContentCode}>
          titleStyle <span className={cardStyle.cardContentReserverdWordTs}> = </span> {'{'}
            <br/>
            {'  '}title: <span className={cardStyle.cardContentStringTs}>'Title'</span>,
            <br/>
            {'  '}titleDescription: <span className={cardStyle.cardContentStringTs}>'Title-description'</span>,
            <br/>
          {'}'}
        </pre>
        <p>Now you can use it</p>
        <pre className={cardStyle.cardContentCode}>
          {'<'}
            <span className={cardStyle.cardContentReserverdWordTs}>h1 </span>
            <span className={cardStyle.cardContentStringTs}>className=</span>
            {'{titleStyle.title}'}
          {'>'}
          Welcome to postcss-typescript-css!
          {'<'}
            <span className={cardStyle.cardContentReserverdWordTs}>/h1</span>
          {'>'}
          <br/>
          {'<'}
            <span className={cardStyle.cardContentReserverdWordTs}>h3 </span>
            <span className={cardStyle.cardContentStringTs}>className=</span>
            {'{titleStyle.titleDescription}'}
          {'> '}
          <br/>
          This is an example using the plugin with webpack 2, React, TypeScript and PostCSS
          <br/>
          {' <'}
            <span className={cardStyle.cardContentReserverdWordTs}>/h3</span>
          {'>'}
        </pre>
      </div>
    </article>
  );
};
