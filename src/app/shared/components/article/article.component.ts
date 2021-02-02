import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {ActivatedRoute} from '@angular/router';
import {selectUserState, UserState} from '../../../core/store/state/user.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Article} from '../../models/article.model';
import {CommentsService} from '../../services/comments.service';
import {Comment} from '../../models/comment.model';
import {User} from '../../../core/models/user.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  post_id: number;
  fragment: string;
  getState: Observable<any>;
  isAuthenticated: boolean;
  article: Article[] = [];
  comments: Comment[] = [];
  user: User;
  constructor(private store: Store<UserState>, private articleService: ArticleService, private route: ActivatedRoute, private commentService: CommentsService) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.user = state.user;
      this.isAuthenticated = state.isAuthenticated;
    });
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
    this.route.params.subscribe(params => {
      this.post_id = params['id'];
      this.articleService.getArticle(params['id'])
          .subscribe((article: Article[]) => {
            this.article = article;
          });
      this.commentService.getComments(params['id'])
          .subscribe((comments: Comment[]) => {
            this.comments = comments;
          });
    });
    if (this.fragment) {
      //document.querySelector('#' + this.fragment).scrollIntoView({behavior: 'smooth'});
    }
  }

  sendComment($event) {
    const user_comment = {
      text: $event,
    };
    this.commentService.addComment(this.post_id, null, user_comment.text).subscribe((response) => {
      const comment = {
        commentator: {id: this.user ? this.user.id : response.id, avatar: this.user ? this.user.avatar : response.avatar, full_name: this.user ? this.user.full_name : response.full_name},
        created: new Date().toString(),
        text: response.text,
        id: response.id,
        comments: response.comments,
      };
      this.comments.push(comment);
    });
  }
}
