import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyhttpInterceptor } from './core/interceptors/myhttp.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:MyhttpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
