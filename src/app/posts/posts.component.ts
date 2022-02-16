import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  comments: Comment = { id: 0, author: 'Andres', content: '' };

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
    this.postService.getPosts().subscribe((post) => {
      this.post = post[this.id - 1];
    });
  }

  getErrorMessage() {
    return 'You must enter a comment';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  onAddComment(comments: Comment) {
    if (comments.content !== '') {
      this.postService.addComment(this.id, this.comments);
    }
  }
}
