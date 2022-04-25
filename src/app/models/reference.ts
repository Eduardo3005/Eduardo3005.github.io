import { Image } from "./image";

export class Reference {
    Name: string;
    Description: string;
    Images: Array<Image>;
    Recomendations: Array<Recomendation>
    Link: string;
  }
  
  export class Recomendation {
    IconPath: string;
    Text: string;
  }