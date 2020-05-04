import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/authGuard/auth.guard';
import { DataService } from './services/data/data.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    EditProfileComponent
  ],
  imports: [
    HttpClientModule, BrowserModule, BrowserAnimationsModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule, MatCardModule,
    MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        },
        whitelistedDomains: ["http://localhost:4200/users"]
        // blacklistedRoutes: ["example.com/examplebadroute/"]
      }
    })
  ],
  providers: [AuthService, AuthGuard, DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
