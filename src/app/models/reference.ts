import { Image } from "./image";

export class Reference {
    Name: string;
    Description: string;
    MainImage: Image;
    Recommendations: Array<Recommendations>
    Link: string;
  }

  export class Recommendations {
    IconPath: string;
    Text: string;
  }
