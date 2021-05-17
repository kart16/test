import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copyrightDate: number;

  constructor() { }

  ngOnInit() {
    this.copyrightDate = new Date().getFullYear();
  }

}
