import { Component, Inject, OnInit} from '@angular/core';
import { Post, PostsService } from '../post.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
  
  posts: any[] = [];
  filter : {category:string} = {category : ""};

  constructor(private postService: PostsService, private router: Router, public dialog: MatDialog, private http: HttpClient) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
  ngOnInit(): void {
    // this.posts = this.postService.posts;
    
    this.postService.getPostSubject$.subscribe( () => {
      console.log("Se llamó")
      this.postService.getPosts().subscribe((post)=> 
      {
        this.posts = post
      }
      )});
  }

  setCategory(category:string) {
    this.filter.category = category;
  }

  goToRoute(route: string) {
    this.router.navigate(['../' + route]);
  }

  

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./dialog-overview-example-dialog.scss'],
  providers: [PostsService],
})
export class DialogOverviewExampleDialog {
  pst: Post =
  {id: 0, title: "", shortDescription: "", description: "", category: "", image: "https://source.unsplash.com/random", comments:[]}
    
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private postService: PostsService) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddPost() {
    this.postService.addPost(this.pst);
  }
}