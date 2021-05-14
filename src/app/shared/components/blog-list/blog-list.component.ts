import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {selectUserState, UserState} from '../../../core/store/state/user.state';
import {GetBlogPosts} from '../../../core/store/actions/user-info.action';
import {Observable} from "rxjs";

interface Posts {
  id: number;
  created: string;
  modified: string;
  title: string;
  content: string;
  comments_qtty: number;
  previous_post: object;
  next_post: object;
  tags: string;
  publisher_name: string;
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  p = 1;
  getState: Observable<any>;
  posts: Posts[] = [];
  constructor(private store: Store<UserState>) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.posts = state.blogPosts.results;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetBlogPosts());
  }
}
