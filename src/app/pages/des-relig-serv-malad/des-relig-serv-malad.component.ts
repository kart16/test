import { Component, HostListener, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-des-relig-serv-malad',
  templateUrl: './des-relig-serv-malad.component.html',
  styleUrls: ['./des-relig-serv-malad.component.scss']
})
export class DesReligServMaladComponent {

  isShow: boolean;
  topPosToStartShowing = 100;

  constructor() { }

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

  ngOnInit() {
  }

}
