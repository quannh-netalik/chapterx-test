import { FC, useState } from 'react';
import ChapterCard, { IChapterCard } from './ChapterCard';
import { CardContainer } from './ChapterCards.styled';
import { CreateCardModal, PreviewCardModal } from './modal';
import { useChapterCardContext } from '../../contexts';

interface ChapterCardsInterface {
  title: string;
  products: IChapterCard[];
  selected: number;
}

const ChapterCards: FC<ChapterCardsInterface> = ({ title, products, selected }) => {
  const { setShowPreviewModal } = useChapterCardContext();
  const [select, setSelect] = useState<number>(selected);
  if (select) {
    setShowPreviewModal(true);
  }

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
      {select !== 0 && <PreviewCardModal cardId={select} setSelect={setSelect} />}
    </>
  );
};
export default ChapterCards;
