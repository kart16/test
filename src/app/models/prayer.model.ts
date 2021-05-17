export class Prayer {
  constructor(public name: string, 
              public prayer: string, 
              public date: Date, 
              public activated : boolean = false,
              public id?: number) {
  }
}
