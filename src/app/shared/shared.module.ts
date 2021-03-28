import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from '../main/pages/main-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

import {NotFoundComponent} from './pages/not-found/not-found.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { ModalsComponent } from './components/modals/modals.component';

import {BlogListService} from './services/blog-list.service';
import {ArticleService} from './services/article.service';
import {ModalsService} from './services/modals.service';
import { ToplineComponent } from './components/topline/topline.component';
import {UserService} from './services/get-user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CommentBoxComponent} from './components/article/comment-box/comment-box.component';
import {CommentComponent} from './components/article/comment/comment.component';
import {CommentsService} from './services/comments.service';
import {ClickOutsideDirective} from './directives/clickOutside.directive';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ModalsModule} from './components/modals/modals.module';

@NgModule({
  declarations: [
    NotFoundComponent,
    BlogListComponent,
    ModalsComponent,
    ToplineComponent,
    CommentComponent,
    CommentBoxComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ToggleButtonModule,
    ModalsModule
  ],
  exports: [
    ModalsModule,
    BlogListComponent,
    ToplineComponent,
    NotFoundComponent,
    CommentBoxComponent,
    CommentComponent,
    ClickOutsideDirective
  ],
  providers: [BlogListService, ArticleService, ModalsService, UserService, CommentsService]
})
export class SharedModule { }
