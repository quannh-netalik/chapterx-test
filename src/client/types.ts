export type TCard = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  telegram: string;
  company: string;
  title: string;
  twitter?: string;
  profile: string;
}

export type CreateDesign = Omit<TCard, 'id'> & {
  image?: {
    name: string;
    thumbUrl: string;
  }
};
