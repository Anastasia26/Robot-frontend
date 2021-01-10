import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';



@NgModule({
  declarations: [NotFoundComponent, BlogListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BlogListComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
