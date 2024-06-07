import { BRANDS, TYPE_DEVICE } from "../utils/constants";

export type ProductType = {
  _id: string;
  deviceCode: string;
  name: string;
  price: number;
  stock: number;
  information: string;
  techSpecification: {
    CPU: string;
    RAM: string;
    storage: string;
    graphicCard: string;
    display: string;
    ports: string;
    audio: string;
    keyboard: string;
    cardReader: string;
    wifiStandard: string;
    bluetooth: string;
    webcam: string;
    operatingSystem: string;
    battery: string;
    weight: string;
    color: string;
    dimensions: string;
    [key: string]: string;
  };
  rateQuan: number;
  rateSum: number;
  brand: string;
  discount: number;
  typeDevice: string;
  year: number;
  sold: number;
  warranty: string;
  slug: string;
  createAt: number;
  updateAt: number | null;
  imageList: string[];
  _destroy: boolean;
};

export type NewProductType = Omit<
  ProductType,
  | "rateQuan"
  | "rateSum"
  | "slug"
  | "createAt"
  | "updateAt"
  | "imageList"
  | "_destroy"
  | "_id"
  | "information"
>;

export const initialProduct: NewProductType = {
  deviceCode: "",
  name: "",
  price: 0,
  stock: 0,
  techSpecification: {
    CPU: "",
    RAM: "",
    storage: "",
    graphicCard: "",
    display: "",
    ports: "",
    audio: "",
    keyboard: "",
    cardReader: "",
    wifiStandard: "",
    bluetooth: "",
    webcam: "",
    operatingSystem: "",
    battery: "",
    weight: "",
    color: "",
    dimensions: "",
  },
  brand: BRANDS[0],
  discount: 0,
  typeDevice: TYPE_DEVICE[0],
  year: import.meta.env.VITE_CURRENT_YEAR,
  sold: 0,
  warranty: "",
};
