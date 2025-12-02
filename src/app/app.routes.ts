import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { HOME } from './home/home';
import { RegisterPage } from './pages/register-page/register-page';
import { RestaurantListPage } from './restaurant-list-page/restaurant-list-page';
import { RestaurantMenuPages } from './pages/restaurant-menu-pages/restaurant-menu-pages';

export const routes: Routes = [
    {
        path: "",
        component: HOME
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path:"register",
        component:RegisterPage
    },
     {
        path:"restaurant-list",
        component:RestaurantListPage
    },
    
    

    {
        path:"restaurant-list",
        component:RestaurantListPage
    },
    {
        path:"restaurant-menu/:restaurantName",
        component:RestaurantMenuPages
    },
    

    
];
