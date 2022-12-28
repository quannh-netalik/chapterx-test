import { FC } from 'react';

import CustomCardImage from './assets/custom-card.png';
import WristbandCardImage from './assets/wristband-card.png';

import type { IChapterCard } from '../../components';
import { Container, ChapterCards } from '../../components';

const products: IChapterCard[] = [
  {
    id: 1,
    type: 'wristband',
    title: 'Wristband Card',
    image: WristbandCardImage,
    description: 'Standard (white and black)',
  },
  {
    id: 2,
    type: 'custom',
    title: 'Custom Card',
    image: CustomCardImage,
    description: 'Customize Cards',
  },
];

const Home: FC = () => (
  <Container>
    <ChapterCards title="Product List" products={products} selected={0} />
  </Container>
);

export default Home;
