import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CustomHeader } from './Container.styled';
import config from '../../config';

const Headers: FC = () => (
  <CustomHeader>
    <Link to={config.routes.home}>
      <h1>ChapterX</h1>
    </Link>

    <div>
      <Link to={config.routes.home}>Home</Link>
      <Link to={config.routes.designs}>Designs</Link>
    </div>
  </CustomHeader>
);

export default Headers;
