import { useCallback, useEffect, useState } from 'react';
import { TCard } from '../types';

const mocks: TCard[] = [
  {
    id: 1,
    email: 'leongaban@gmail.com',
    firstName: 'Leon',
    lastName: 'Gaban',
    image: 'https://res.cloudinary.com/dtgfpjvoi/image/upload/v1664896667/cards/profile_leongaban.png',
    telegram: 'leongaban',
    company: 'MoonHoldings',
    title: 'Founder',
    profile: 'https://chapterx.network/leongaban',
  },
  {
    id: 2,
    email: 'leongaban@gmail.com',
    firstName: 'Leon',
    lastName: 'Gaban',
    image: 'https://res.cloudinary.com/dtgfpjvoi/image/upload/v1664896667/cards/profile_leongaban.png',
    telegram: 'leongaban',
    company: 'MoonHoldings',
    title: 'Founder',
    profile: 'https://chapterx.network/leongaban',
  },
];

type UseDesignType = {
  list: TCard[];
  getList: () => Promise<TCard[]>;
}

const useDesigns = (): UseDesignType => {
  const [list, setList] = useState<TCard[]>([]);

  // fetch data from server
  const getList = useCallback(async () => mocks, []);

  useEffect(() => {
    getList().then(setList);
  }, [getList]);

  return { list, getList };
};

export default useDesigns;
