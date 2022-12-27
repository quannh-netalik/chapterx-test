import { FC, useState } from 'react';
import ChapterCard, { IChapterCard } from './ChapterCard';
import { CardContainer } from './ChapterCards.styled';
import { CreateCardModal, PreviewCardModal } from './modal';

interface ChapterCardsInterface {
  title: string;
  products: IChapterCard[];
}

const ChapterCards: FC<ChapterCardsInterface> = ({ title, products }) => {
  const [select, setSelect] = useState<number>();

  return (
    <>
      <CardContainer>
        <h1>{title}</h1>
        <div className="chapter-cards">
          {products.map((product) => (
            <ChapterCard
              key={product.id}
              id={product.id}
              type={product.type}
              title={product.title}
              image={product.image}
              description={product.description}
              setSelect={setSelect}
            />
          ))}
        </div>
      </CardContainer>

      <CreateCardModal />
      {select && <PreviewCardModal cardId={select} />}
    </>
  );
};
export default ChapterCards;
