import {
  ReactNode, createContext, useCallback, useContext, useMemo, useState,
} from 'react';

export type ChapterCardContextType = {
  showCreateModal: boolean;
  showPreviewModal: boolean;
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  hideCreateModal: () => void;
  setShowPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
  hidePreviewModal: () => void;
}

export const ChapterCardContext = createContext<ChapterCardContextType>(
  {} as ChapterCardContextType,
);

export const ChapterCardProvider = ({ children }: { children: ReactNode }) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const hideCreateModal = useCallback(() => setShowCreateModal(false), [setShowCreateModal]);
  const hidePreviewModal = useCallback(() => setShowPreviewModal(false), [setShowPreviewModal]);

  const value: ChapterCardContextType = {
    showCreateModal,
    showPreviewModal,
    setShowCreateModal,
    hideCreateModal,
    setShowPreviewModal,
    hidePreviewModal,
  };

  const _value: ChapterCardContextType = useMemo(() => value, Object.values(value));
  return <ChapterCardContext.Provider value={_value}>{children}</ChapterCardContext.Provider>;
};

export const useChapterCardContext = (): ChapterCardContextType => useContext(ChapterCardContext);
