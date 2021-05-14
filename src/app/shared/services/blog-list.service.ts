import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Comment} from '../models/comment.model';

@Injectable()

export class BlogListService {

    constructor(private http: HttpClient) {}

    getPosts(): any {
        return this.http.get<Comment[]>(environment.apiEndpoint + `/blog/posts/?limit=5&offset=0`);
    }

    getRecentPosts(): any {
        return this.http.get<Comment[]>(environment.apiEndpoint + `/blog/recent-posts/?limit=5&offset=0`);
    }
}
