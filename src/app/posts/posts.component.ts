import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostsService]
})

export class PostsComponent implements OnInit, OnDestroy {
posts: any[] = [];
  id!: number;
sub;
comments:{name: string, comment: string} = {name:"Andres", comment:""};  
  
constructor(private router: Router, private route: ActivatedRoute, private postService: PostsService) {
  this.sub = this.route.params.subscribe(params => {
    this.id = +params['id']; // (+) converts string 'id' to a number
  });
}  
 

  ngOnInit(){
    this.posts = this.postService.posts;

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
