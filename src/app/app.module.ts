import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FaireUnDonComponent } from './pages/faire-un-don/faire-un-don.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPayPalModule } from 'ngx-paypal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrayerService } from './Services/prayer.service';
import {FileService} from './Services/file.service';
import {SubscriberService} from './Services/subscriber.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { StCamQuiEsTuComponent } from './pages/st-cam-qui-es-tu/st-cam-qui-es-tu.component';
import { FamilleCamillienneFranceComponent } from './pages/famille-camillienne-france/famille-camillienne-france.component';
import { ChoisirLaVieConsacreeComponent } from './pages/choisir-la-vie-consacree/choisir-la-vie-consacree.component';
import { DesReligServMaladComponent } from './pages/des-relig-serv-malad/des-relig-serv-malad.component';
import { NewsService } from './Services/news.service';
import { CommunicationService } from './Services/communication.service';
import { EmailService } from './Services/email.service';
import { AuthService } from './Services/auth.service';
import { AlbumService } from './Services/album.service';
import { GalerieComponent } from './pages/galerie/galerie.component';
import { NosCommunautesComponent } from './pages/nos-communautes/nos-communautes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LesFraternitesStCamilleComponent } from './pages/les-fraternites-st-camille/les-fraternites-st-camille.component';
import { MissionsCamilliennesComponent } from './pages/missions-camilliennes/missions-camilliennes.component';
import { AllerPlusLoinComponent } from './pages/aller-plus-loin/aller-plus-loin.component';
import { AumoneriesComponent } from './pages/aumoneries/aumoneries.component';
import { NosOuvragesComponent } from './pages/nos-ouvrages/nos-ouvrages.component';

const appRoutes: Routes = [

  { path: 'adminPage', canActivate: [AuthGuardService], component: AdminPageComponent},
  { path: 'adminPage/view/:id', canActivate: [AuthGuardService], component: GalerieComponent},
  
  { path: 'livres', component: NosOuvragesComponent},
  { path: 'nos-communautes', component: NosCommunautesComponent},
  { path: 'st-camille-qui-es-tu', component: StCamQuiEsTuComponent },
  { path: 'des-religieux-au-service-des-malades', component: DesReligServMaladComponent},
  { path: 'faire-un-don', component: FaireUnDonComponent },
  { path: 'famille-camillienne-de-france', component: FamilleCamillienneFranceComponent},
  { path: 'choisir-la-vie-consacree', component: ChoisirLaVieConsacreeComponent},
  { path: 'fraternites-st-camille', component: LesFraternitesStCamilleComponent},
  { path: 'missions-camilliennes', component: MissionsCamilliennesComponent},
  { path: 'aumoneries', component: AumoneriesComponent},
  { path: 'aller-plus-loin', component: AllerPlusLoinComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FaireUnDonComponent,
    HeaderComponent,
    FooterComponent,
    AdminPageComponent,
    GalerieComponent,
    StCamQuiEsTuComponent,
    FamilleCamillienneFranceComponent,
    ChoisirLaVieConsacreeComponent,
    DesReligServMaladComponent,
    NosCommunautesComponent,
    LesFraternitesStCamilleComponent,
    MissionsCamilliennesComponent,
    AllerPlusLoinComponent,
    AumoneriesComponent,
    NosOuvragesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes,{
      anchorScrolling: 'enabled'
    }),
    NgxPayPalModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    PdfViewerModule,
    NgbModule
  ],
  providers: [ 
    PrayerService, 
    FileService, 
    SubscriberService,
    NewsService,
    CommunicationService,
    EmailService,
    AuthService,
    AuthGuardService,
    AlbumService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
