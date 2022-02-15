import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService, Comment } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})

export class PostsComponent implements OnInit, OnDestroy {
posts: any[] = [];
  id!: number;
sub;
comments:Comment = {id: 0, author:"Andres", content:""};  
  
constructor(private router: Router, private route: ActivatedRoute, private postService: PostsService) {
  this.sub = this.route.params.subscribe(params => {
    this.id = +params['id']; // (+) converts string 'id' to a number
  });
}  

  ngOnInit(){
    // this.posts = this.postService.posts;

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/main']);
  }

  onAddComment() {
    this.postService.addComment(this.id, this.comments)
  }
  
}
