//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Firebase and Authentication Imports
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';

//Component Imports
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AdminComponent } from './admin/admin.component';

//Service Imports
import {UsersService} from './services/users.service';
import {ProductsService} from './services/products.service';
import {CartService} from './services/cart.service';

//Material Imports
import {MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatExpansionModule, MatDividerModule} from '@angular/material';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    ProductsComponent,
    HomeComponent,
    CartComponent,
    InventoryComponent,
    AdminComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,

    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'inventory',
        component: InventoryComponent
      },
       {
        path: 'admin',
        component: AdminComponent
      }
      
      
      ])
    
    
    
 
  ],
  providers: [AuthService, UsersService, ProductsService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
