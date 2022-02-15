import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
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

@Injectable(
  {
    providedIn: "root",
  }
)
export class PostsService {
  id!: number;
  posts: Post[] = [];
  
  getPostSubject$: Observable<any>;
  getPostSubject: BehaviorSubject<any>;

  baseUrl = 'https://private-c3edb-postsmock.apiary-mock.com';

  constructor(private http: HttpClient) {
    this.getPostSubject = new BehaviorSubject(null);

    this.getPostSubject$ = this.getPostSubject.asObservable();
  }

  addComment(id: number, comments: Comment) {
    for (let i = 0; i < this.posts.length; i++) {
      const element = this.posts[i];

      if (this.posts[i].id === id) this.posts[i].comments.push(comments);
    }
  }

  addPost(pst: Post) {
    pst.id = this.posts.length + 1;

    this.posts.push(pst);
    this.setPostChange(pst);
  }

  editPost(posts: {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    image: string;
    comments: [];
  }) {
    for (let i = 0; i < this.posts.length; i++) {
      const element = this.posts[i];

      if (this.posts[i].id === posts.id) this.posts[i].comments.push();
    }
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

  setPostChange(pst:any) {

    this.getPostSubject.next(pst);

  }
}
