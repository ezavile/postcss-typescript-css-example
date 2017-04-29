# postcss-typescript-css-example
How to use [postcss-typescript-css] plugin with webpack 2, React, TypeScript and PostCSS

This project has two components Card and Title. Each component has its own style file. The Card Component is using **postcss-modules**.

## Usage
### TitleComponent
**title.css** (I'm using [cssnext])
```css
.Title {
  color: #444;
  margin: 0;
  &-description  {
    color: #acb2b5;
    margin-bottom: 0;
    }
}
```
**Title.tsx**
```javascript
import  './title.css';
import { titleStyle } from  './titleStyle';
```
So, titleStyle is an object with two properties:
```javascript
titleStyle  =  {
  title: 'Title',
  titleDescription: 'Title-description',
}
```
Now you can use it
```jsx
<h1 className={titleStyle.title}>Welcome to postcss-typescript-css!</h1>
<h3 className={titleStyle.titleDescription}>This is an example using the plugin with webpack 2, React, TypeScript and PostCSS</h3>
```
[postcss-typescript-css]: https://github.com/ezavile/postcss-typescript-css
[cssnext]: https://github.com/MoOx/postcss-cssnext
