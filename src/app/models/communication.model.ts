export class Communication {
  constructor(public content: string, 
              public title: string,
              public date : Date = new Date(),
              public id?: number) {
  }
}
