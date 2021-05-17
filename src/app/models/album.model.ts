export class Album {
  albumname: string;
  albumurl : string;
  albumphotos: {name : string, url : string} [] ;
  upload_photos : any [] = [];
  constructor(name : string, url : string, photos : {name : string, url : string} []) {
    this.albumname = name;
    this.albumphotos = photos;
    this.albumurl = url;
  }

}