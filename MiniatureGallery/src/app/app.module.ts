import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ManagementComponent } from './management/management.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ManagementComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    // AngularFireDatabase,
    // AngularFireModule.initializeApp({
    //   apiKey: "AIzaSyDqU-woVcHH-TLE4xOIZQcj4KxD_NQvI8w",
    //   authDomain: "miniaturegalleryimages.firebaseapp.com",
    //   storageBucket: "miniaturegalleryimages.appspot.com",
    //   projectId: "1:836278301088:web:ea0e56decf7ca9396df4c5",
    // }),
    // AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
