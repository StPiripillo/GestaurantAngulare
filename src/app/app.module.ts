import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule, DragDropModule, AppComponent],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
