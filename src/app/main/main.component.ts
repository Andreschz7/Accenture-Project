import { Component, Inject, OnInit} from '@angular/core';
import { PostsService } from '../post.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
 
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [PostsService],
})

export class MainComponent implements OnInit {
  
  posts: any[] = [];
  filter : {category:string} = {category : ""};

  constructor(private postService: PostsService, private router: Router, public dialog: MatDialog) {
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
    this.posts = this.postService.posts;
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
  pst: { id: number; title: string; shortDescription: string; description: string; category: string; image: string; comments:[]} =
  {id: 0, title: "", shortDescription: "", description: "", category: "", image: "https://source.unsplash.com/random", comments:[]}
    
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private postService: PostsService) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddPost() {
    this.postService.addPost(this.pst)
  }
}