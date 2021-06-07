import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/_services/auth.service';
import { CommonServicesService } from './modules/auth/_services/common-services.service';
import { environment } from 'src/environments/environment';
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
import { DashboardServicsService } from './modules/commonServices/dashboard-servics.service';
import { JwtModule } from "@auth0/angular-jwt";
import { AddRequestHeaderService } from './modules/auth/_services/add-request-header.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    NgSelectModule,
    NgxUiLoaderModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44329","localhost:4200"],
        disallowedRoutes: [""],
      },
    }),
  ],
  providers: [
    DatePipe,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          json: () => import('highlight.js/lib/languages/json')
        },
      },
    }
    ,
    { provide: HTTP_INTERCEPTORS, useClass: AddRequestHeaderService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy}
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
