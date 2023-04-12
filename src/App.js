import { BrowserRouter } from 'react-router-dom';

import { MyRouters } from './components/router';


function App() {

  return (
    <BrowserRouter>
      <MyRouters/>
    </BrowserRouter>
  );
}

export default App;
