import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService, Post } from '../post.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService,
    private fb: FormBuilder
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

  myForm: FormGroup = this.fb.group({
    id: [0],
    content: ['', Validators.required],
    author: ['Andres'],
  });

  getErrorMessage() {
    return 'You must enter a comment';
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  onAddComment() {
    if (this.myForm.controls['content'].value !== '') {
      this.postService.addComment(this.id, this.myForm.value);
    }
    this.myForm.controls['content'].reset();
  }

  campoEsValido(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
