import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(environment.apiEndpoint + `/blog/post/${id}/comments/`);
  }

  addComment(post: number, parent_comment: number, text: string): Observable<any> {
    const url = environment.apiEndpoint + `/blog/post/create-comment/`;
    return this.http.post<any>(url, {post, parent_comment, text});
  }
}
