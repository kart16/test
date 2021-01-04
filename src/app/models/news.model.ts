export class News {
  constructor(public title: string, 
              public content: string, 
              public date: Date, 
              public creation_date? : Date,
              public id?: number) {
  }
}
