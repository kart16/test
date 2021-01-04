import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nos-ouvrages',
  templateUrl: './nos-ouvrages.component.html',
  styleUrls: ['./nos-ouvrages.component.scss']
})
export class NosOuvragesComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 100;
  imgTab: string[] = [];

  constructor() { }

  ngOnInit() { 
    this.fct();
  }
  
  fct(){
    for(var i=0;i<16;i++){
      this.imgTab[i]="assets/images/pt_carte_"+(i+1)+".jpg";
    }
  }

  @HostListener('window:scroll')
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= (this.topPosToStartShowing+1000)) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
