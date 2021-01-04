export class File {
              location: string;
              type: string;
              size: number; 
              date: Date = new Date(); 
              uploadDate: Date = new Date(); 
              name: string; 
              id: number;
              event_file : any = null;
  constructor() {}

}