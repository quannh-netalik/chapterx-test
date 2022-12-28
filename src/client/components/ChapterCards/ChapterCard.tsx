import { FC, useCallback } from 'react';
import { CustomCard } from './ChapterCards.styled';
import { useChapterCardContext } from '../../contexts';

export interface IChapterCard {
  type: 'wristband' | 'custom' | 'designs';
  id: number;
  title: string;
  image: string;
  description: string;
}

type ChaptersCarsProps = IChapterCard & {
  setSelect: React.Dispatch<React.SetStateAction<number>>;
}

const ChapterCard: FC<ChaptersCarsProps> = ({
  id,
  type,
  title,
  image,
  description,
  setSelect,
}) => {
  const { setShowCreateModal, setShowPreviewModal } = useChapterCardContext();
  const onProductClick = useCallback(() => {
    if (type === 'custom') {
      setShowCreateModal(true);
    }

    if (type === 'designs') {
      setSelect(id);
      setShowPreviewModal(true);
    }
  }, [type, id]);

  return (
    <CustomCard
      hoverable
      onClick={onProductClick}
      cover={<img alt={title} src={image} width={300} height={250} />}
    >
      <CustomCard.Meta title={title} description={description} />
    </CustomCard>

  );
};

export default ChapterCard;
