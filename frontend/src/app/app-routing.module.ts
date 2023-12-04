import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { BookDetailsComponent } from './pages/books/book-details/book-details.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { DiscussionDetailsComponent } from './pages/discussion-details/discussion-details.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ThankYouComponent } from './shared/components/thank-you/thank-you.component';
import { authGuardGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"books", component: BookListComponent},
  {path:"books/:id", component: BookDetailsComponent},
  {path:"discussions/:id", component: DiscussionDetailsComponent, canActivate: [authGuardGuard]},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path: "cart", component: CartPageComponent , canActivate: [authGuardGuard]},
  {path: "checkout", component:CheckoutComponent , canActivate: [authGuardGuard]},
  {path: "wishlist", component:WishlistComponent , canActivate: [authGuardGuard]},
  {path: "profile", component:ProfilePageComponent , canActivate: [authGuardGuard]},
  {path: "order-confirmed", component:ThankYouComponent , canActivate: [authGuardGuard]},
  {path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
