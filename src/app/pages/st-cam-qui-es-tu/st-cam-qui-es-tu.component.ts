import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-st-cam-qui-es-tu',
  templateUrl: './st-cam-qui-es-tu.component.html',
  styleUrls: ['./st-cam-qui-es-tu.component.scss']
})
export class StCamQuiEsTuComponent {

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
}
