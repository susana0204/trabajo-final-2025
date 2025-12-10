import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { HOME } from './home/home';
import { RegisterPage } from './pages/register-page/register-page';
import { RestaurantListPage } from './restaurant-list-page/restaurant-list-page';
import { RestaurantMenuPages } from './pages/restaurant-menu-pages/restaurant-menu-pages';
import { MenuUser } from './pages/menu-user/menu-user';
import { GeneralLayout } from './layout-/general-layout/general-layout';
import { UserLayout } from './layout-/user-layout/user-layout';

export const routes: Routes = [
    {
        path: "",
        component: HOME
    },


    {
        path: "",
        component: GeneralLayout,

        children: [

            {
                path: "restaurant-list",
                component: RestaurantListPage
            },
            {
                path: "menu",
                component: RestaurantMenuPages,
            }

        ]
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "register",
        component: RegisterPage
    },


    {
        path: "admin",
        component: UserLayout,
        children: [
            {
                path: "",
                component: MenuUser
            },

        ]

    },

    {
        path: "restaurant-menu/:restaurantName",
        component: RestaurantMenuPages
    },



];
