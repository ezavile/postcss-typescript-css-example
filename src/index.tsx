import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Card } from './components/Card/Card';

const app: HTMLDivElement = document.createElement('div');
document.body.appendChild(app);

export const App: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <Card />
    </div>
  );
};

ReactDOM.render(<App />, app);
