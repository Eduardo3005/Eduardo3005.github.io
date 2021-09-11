import { Image } from "./image";
import { SlideShowElement } from "./slide-show-element";

export class House {
  Tipology: number;
  Name: string;
  Descripion: string;
  FullDescription: string;
  ImagePath: string;
  Options:  Array<Option>;
  Accommodations:  Array<Accommodation>;
  Images: Array<Image>;
}

export class Option {
  Name: string;
  Price: string;
}
export class Accommodation {
  Name: string;
}
