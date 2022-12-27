import { FC } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Designs, Home } from './pages';

import config from './config';
import { ChapterCardProvider } from './contexts';
import { Container } from './components';

const App: FC = () => (
  <ChapterCardProvider>
    <BrowserRouter>
      <Routes>
        <Route path={config.routes.home} element={<Home />} />
        <Route path={config.routes.designs} element={<Designs />} />

        <Route path="*" element={<Container>Not found, bye!</Container>} />
      </Routes>
    </BrowserRouter>
  </ChapterCardProvider>
);

export default App;
