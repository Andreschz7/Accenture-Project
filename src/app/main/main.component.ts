import { Component, OnInit } from '@angular/core';
import { Post, PostsService } from '../post.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormsComponent } from '../forms/forms.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  obs!: Observable<Post[]>;
  post!: Post;
  posts: any[] = [];
  category: string[] = [
    'all',
    'travel',
    'lifestyle',
    'business',
    'vacation',
    'other',
  ];
  filter: { category: string } = { category: '' };

  constructor(
    private postService: PostsService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '525px',
    });
  }

  openDialogEdit(post: Post): void {
    post;
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '525px',
      data: post,
    });
  }

  ngOnInit(): void {
    this.obs = this.postService.getPosts();
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
