import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()

export class ArticleService {
    constructor(private http: HttpClient) {}

    getArticle(id: number): any {
        return this.http.get(environment.apiEndpoint + `/blog/post/${id}/`);
    }

    getArticleComments(id: number): any {
        return this.http.get(environment.apiEndpoint + `/blog/post/${id}/comments/`);
    }

    // addComment(comment: Comment) {
    //     this.commentAction$.next(comment);
    // }

}
