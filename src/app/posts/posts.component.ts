import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { PostsService, Comment, Post } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  post!: Post;
  id!: number;
  sub;
  sub2!: Subscription;
  comment: Comment = { id: 0, content: '', author: 'Andres' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService
  ) {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnInit() {
    this.sub2 = this.postService.getPosts().subscribe((post) => {
      this.post = post[this.id - 1];
    });
  }

  getErrorMessage() {
    return 'You must enter a comment';
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  onAddComment() {
    if (this.comment.content !== '') {
      this.postService.addComment(this.id, this.comment);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
