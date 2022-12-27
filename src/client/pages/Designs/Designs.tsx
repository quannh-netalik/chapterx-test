import { FC } from 'react';
import { ChapterCards, Container, IChapterCard } from '../../components';
import { useDesigns } from '../../hooks';

const Designs: FC = () => {
  const { list: designs } = useDesigns();

  const _products: IChapterCard[] = designs.map((design) => ({
    id: design.id,
    type: 'designs',
    title: `${design.firstName} ${design.lastName} - @${design.telegram}`,
    image: design.image,
    description: `Title: ${design.title} - ${design.company}`,
  }));

  return <Container><ChapterCards title="Designs" products={_products} /></Container>;
};

export default Designs;
