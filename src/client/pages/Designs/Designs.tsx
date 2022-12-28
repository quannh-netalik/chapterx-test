import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChapterCards, Container, IChapterCard } from '../../components';
import { useDesigns } from '../../hooks';

const Designs: FC = () => {
  const [searchParams] = useSearchParams();
  const selectedParam = searchParams.get('selected');
  const selectedCard = parseInt(selectedParam || '0', 10);

  const { list: designs } = useDesigns();

  const _products: IChapterCard[] = designs.map((design) => ({
    id: design.id,
    type: 'designs',
    title: `${design.firstName} ${design.lastName} - @${design.telegram}`,
    image: design.image,
    description: `Title: ${design.title} - ${design.company}`,
  }));

  return (
    <Container>
      <ChapterCards title="Designs" products={_products} selected={selectedCard} />
    </Container>
  );
};

export default Designs;
