import { SlideShowElement } from "./slide-show-element";

export class House {
  Tipology: number;
  Name: string;
  Descripion: string;
  FullDescription: string;
  SlideShow: Array<SlideShowElement>;
  Options:  Array<Option>;
  Accommodations:  Array<Accommodation>;
}

export class Option {
  Name: string;
  Price: string;
}
export class Accommodation {
  Name: string;
}
