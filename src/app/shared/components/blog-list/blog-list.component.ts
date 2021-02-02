import { Component, OnInit } from '@angular/core';
import {BlogListService} from '../../services/blog-list.service';

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
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: Posts[] = [];
  p = 1;

  constructor(private blogListService: BlogListService) { }

  ngOnInit(): void {
    this.blogListService.getPosts()
        .subscribe((posts: Posts[]) => {
          this.posts = posts;
    });
  }
}
