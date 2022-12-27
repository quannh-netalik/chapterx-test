import { useCallback, useEffect, useState } from 'react';
import { CreateDesign, TCard } from '../types';
import config from '../config';

type UseDesignType = {
  list: TCard[];
  getList: () => Promise<TCard[]>;
  createDesign: (_data: CreateDesign) => Promise<TCard>;
}

const useDesigns = (): UseDesignType => {
  const [list, setList] = useState<TCard[]>([]);

  const createDesign = useCallback(
    async (data: CreateDesign) => fetch(config.api.designs, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((result): Promise<TCard> => result.json()),
    [],
  );

  // fetch data from server
  const getList = useCallback(
    async () => fetch(config.api.designs).then((data) => data.json()),
    [],
  );

  useEffect(() => {
    getList().then(setList);
  }, [getList]);

  return { list, getList, createDesign };
};

export default useDesigns;
