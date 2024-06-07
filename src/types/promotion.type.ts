export type PromotionType = {
  _id: string;
  typeDevice: string;
  description: string;
  createAt: number;
  updateAt: number | null;
  _destroy: boolean;
};

export type NewPromotionType = {
  typeDevice: string;
  description: string;
};
