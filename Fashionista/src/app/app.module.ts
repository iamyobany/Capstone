import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    UserPortalComponent,
    AdminPortalComponent,
    LoginComponent,
    HeaderBarComponent,
    UserListComponent,
    UserComponent,
    RegisterComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    UserUpdateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
