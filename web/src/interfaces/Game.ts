import IAd from "./Ad";

export default interface IGame {
  id: string;
  title: string;
  bannerUrl: string;
  ads?: Array<IAd>,
  _count?: {
    ads: number;
  };
}