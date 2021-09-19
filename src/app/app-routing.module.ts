import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AllerPlusLoinComponent } from './pages/aller-plus-loin/aller-plus-loin.component';
import { AumoneriesComponent } from './pages/aumoneries/aumoneries.component';
import { ChoisirLaVieConsacreeComponent } from './pages/choisir-la-vie-consacree/choisir-la-vie-consacree.component';
import { DesReligServMaladComponent } from './pages/des-relig-serv-malad/des-relig-serv-malad.component';
import { FaireUnDonComponent } from './pages/faire-un-don/faire-un-don.component';
import { FamilleCamillienneFranceComponent } from './pages/famille-camillienne-france/famille-camillienne-france.component';
import { GalerieComponent } from './pages/galerie/galerie.component';
import { LesFraternitesStCamilleComponent } from './pages/les-fraternites-st-camille/les-fraternites-st-camille.component';
import { MissionsCamilliennesComponent } from './pages/missions-camilliennes/missions-camilliennes.component';
import { NosCommunautesComponent } from './pages/nos-communautes/nos-communautes.component';
import { NosOuvragesComponent } from './pages/nos-ouvrages/nos-ouvrages.component';
import { StCamQuiEsTuComponent } from './pages/st-cam-qui-es-tu/st-cam-qui-es-tu.component';
import { AuthGuardService } from './Services/auth-guard.service';


const routes: Routes = [
  { path: 'adminPage', canActivate: [AuthGuardService], component: AdminPageComponent},
  { path: 'adminPage/view/:id', canActivate: [AuthGuardService], component: GalerieComponent},

  { path: 'faire-un-don', component: FaireUnDonComponent, data: { breadcrumb: 'Qui sommes nous ? > Faire un don'} },
  { path: 'st-camille-qui-es-tu', component: StCamQuiEsTuComponent, data: { breadcrumb: 'Qui sommes nous ? > Saint Camille qui es tu ?' } },
  { path: 'des-religieux-au-service-des-malades', component: DesReligServMaladComponent, data: { breadcrumb: 'Qui sommes nous ? > Des religieux au service des malades' }  },
  { path: 'nos-communautes', component: NosCommunautesComponent, data: { breadcrumb: 'Qui sommes nous ? > Nos communautés' }  },

  { path: 'les-aumoneries', component: AumoneriesComponent, data: { breadcrumb: 'Notre apostolat > Les aumoneries' }  },
  { path: 'choisir-la-vie-consacree', component: ChoisirLaVieConsacreeComponent, data: { breadcrumb: 'Notre apostolat > Choisir la vie consacrée' }  },
  { path: 'aller-plus-loin', component: AllerPlusLoinComponent, data: { breadcrumb: 'Notre apostolat > Aller plus loin' }  },
  { path: 'nos-ouvrages', component: NosOuvragesComponent, data: { breadcrumb: 'Notre apostolat > Nos ouvrages' }  },

  { path: 'famille-camillienne-de-france', component: FamilleCamillienneFranceComponent, data: { breadcrumb: 'Famille camillienne de France' }  },
  { path: 'les-fraternites-st-camille', component: LesFraternitesStCamilleComponent, data: { breadcrumb: 'Les fraternités de Saint Camille' }  },
  { path: 'missions-camilliennes', component: MissionsCamilliennesComponent, data: { breadcrumb: 'Mission camilliennes' }  },

  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Accueil' }  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{anchorScrolling: 'enabled'}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
