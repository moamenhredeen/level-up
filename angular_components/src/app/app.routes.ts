import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SliderComponent} from "./slider/slider.component";

export const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "slider", component: SliderComponent},
  {path: "**", redirectTo: "home", pathMatch: "full"},
];
