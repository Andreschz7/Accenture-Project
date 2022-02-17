import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

export interface Comment {
  id: number;

  author: string;

  content: string;
}

export interface Post {
  id: number;

  title: string;

  shortDescription: string;

  description: string;

  publishedAt?: string;

  category: string;

  image: string;

  comments: Comment[];
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  id!: number;
  posts: Post[] = [];

  baseUrl = 'https://private-c3edb-postsmock.apiary-mock.com';

  constructor(private http: HttpClient) {}

  addComment(id: number, comment: Comment) {
    for (let i = 0; i < this.posts.length; i++) {
      const element = this.posts[i];

      if (this.posts[i].id === id) {
        let x = this.posts[i].comments.length;
        comment.id = x + 1;
        this.posts[i].comments.push(comment);
      }
    }
  }

  addPost(pst: Post) {
    let i = this.posts.length;
    pst.id = this.posts[i - 1].id + 1;
    pst.shortDescription = pst.description;

    this.posts.push(pst);
  }

  editPost(post: Post) {
    for (let i = 0; i < this.posts.length; i++) {
      const element = this.posts[i];

      if (this.posts[i].id === post.id) {
        this.posts[i].id = post.id;
        this.posts[i].title = post.title;
        this.posts[i].shortDescription;
        this.posts[i].description = post.description;
        this.posts[i].category = post.category;
        this.posts[i].image = post.image;
        this.posts[i].comments = post.comments;
      }
    }
  }

  deletePost(post: Post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
  }

  getPosts(): Observable<Post[]> {
    if (this.posts.length) {
      return of(this.posts);
    }

    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      tap((posts) => (this.posts = posts))

      // catchError(this.handleError<Post[]>("getPosts", []))
    );
  }
}
