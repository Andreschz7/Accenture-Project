import { Component, Inject, Input, OnInit } from '@angular/core';
import { Post, PostsService } from '../post.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  post!: Post;
  posts: any[] = [];
  filter: { category: string } = { category: '' };

  constructor(
    private postService: PostsService,
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(DialogAddPost, {
      width: '600px',
    });
  }

  openDialogEdit(post: Post): void {
    post;
    const dialogRef = this.dialog.open(DialogEditPost, {
      width: '600px',
      data: post,
    });
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  setCategory(category: string) {
    this.filter.category = category;
  }

  goToRoute(route: string) {
    this.router.navigate(['../' + route]);
  }

  onDeletePost(post: Post) {
    this.postService.deletePost(post);
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-Add-Post.html',
  styleUrls: ['./dialog-Add-Post.scss'],
})
export class DialogAddPost {
  pst: Post = {
    id: 0,
    title: '',
    shortDescription: '',
    description: '',
    category: '',
    image: 'https://source.unsplash.com/random',
    comments: [],
  };

  constructor(
    public dialogRef: MatDialogRef<DialogAddPost>,
    private postService: PostsService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddPost(pst: Post) {
    if (
      pst.title !== '' &&
      pst.description !== '' &&
      pst.category !== '' &&
      pst.image !== ''
    ) {
      this.postService.addPost(this.pst);
    }
  }

  getErrorMessage() {
    return 'Please enter all the required information';
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-Edit-Post.html',
  styleUrls: ['./dialog-Edit-Post.scss'],
})
export class DialogEditPost {
  post: Post = {
    id: 0,
    title: '',
    shortDescription: '',
    description: '',
    category: '',
    image: 'https://source.unsplash.com/random',
    comments: [],
  };

  constructor(
    public dialogRef: MatDialogRef<DialogEditPost>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private postService: PostsService
  ) {
    this.post.id = data.id;
    this.post.title = data.title;
    this.post.shortDescription = data.shortDescription;
    this.post.description = data.description;
    this.post.category = data.category;
    this.post.image = data.image;
    this.post.comments = data.comments;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEditPost(post: Post) {
    this.postService.editPost(this.post);
  }

  getErrorMessage() {
    return 'Please enter all the required information';
  }
}
