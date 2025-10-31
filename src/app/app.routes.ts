import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { HOME } from './home/home';
import { RegisterPage } from './pages/register-page/register-page';
import { ProductPage } from './pages/product-page/product-page';
import { ProductDetailPage } from './pages/product-detail-page/product-detail-page';

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
        path:"product",
        component:ProductPage
    },
    {
        path:"product-detail",
        component:ProductDetailPage
    },
    
    
];
