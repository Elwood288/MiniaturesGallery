import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ManagementComponent } from './management/management.component';


const routes: Routes = [
  {path:"", component: ManagementComponent},
  // {path:"management", component: ManagementComponent}
   {path:"gallery", component: GalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
