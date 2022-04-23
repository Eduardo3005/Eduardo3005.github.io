import { Image } from "./image";

export class Restaurant {
    Name: string;
    Description: string;
    Images: Array<Image>;
    Recomendations: Array<Recomendation>
  }
  
  export class Recomendation {
    Icon: string;
    Text: string;
  }