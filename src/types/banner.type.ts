export type BannerType = {
  _id: string;
  position: string;
  imageURL: string;
  color: string | undefined;
  createAt: number;
  updateAt: number | null;
  _destroy: boolean;
};
