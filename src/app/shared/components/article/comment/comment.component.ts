import { Component, OnInit, Input } from "@angular/core";
import { Comment } from "../../../models/comment.model";
import {CommentsService} from '../../../services/comments.service';
import {Observable} from 'rxjs';
import {selectUserState, UserState} from '../../../../core/store/state/user.state';
import {Store} from '@ngrx/store';
import {User} from '../../../../core/models/user.model';

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"]
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  reply_id: number;
  isEditing = false;
  getState: Observable<any>;
  user: User;

  constructor(private store: Store<UserState>, private commentService: CommentsService) {
    this.getState = this.store.select(selectUserState);
    this.getState.subscribe((state) => {
      this.user = state.user;
    });
  }

  ngOnInit() {}

  replyClick(id) {
    this.reply_id = id;
    this.isEditing = !this.isEditing;
  }

  onAdd($event) {
    const user_comment = {
      text: $event,
    };
    if (!this.comment.comments) {
      this.comment.comments = [];
    }
    this.isEditing = false;
    this.commentService.addComment(null, this.reply_id, user_comment.text).subscribe((response) => {
      const comment = {
        commentator: {id: this.user ? this.user.id : response.id, avatar: this.user ? this.user.avatar : response.avatar, full_name: this.user ? this.user.full_name : response.full_name},
        created: new Date().toString(),
        text: response.text,
        id: response.id,
        comments: response.comments,
      };
      this.comment.comments.push(comment);
    });
  }

}
