import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FilterPipe } from './filter.pipe';
import { Post, PostsService, Comment } from './post.service';

describe('PostService', () => {
  let httpMock: any = {};
  let service: PostsService;
  let posts: Post[] = [];
  let id: Number;

  beforeEach(() => {
    httpMock = {
      get: of([]),
    };
    service = new PostsService(httpMock);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('Add comment', () => {
    let id = 0;
    let posts = [
      {
        id: 0,
        title: 'string',
        shortDescription: 'string',
        description: 'string',
        publishedAt: 'string',
        category: 'string',
        image: 'string',
        comments: [{}],
      },
    ];
    const comment = { id: 0, author: 'Andres', content: 'Text' };
    const result = service.addComment(0, comment);
    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];

      if (element.id === id) {
        let x = element.comments.length;
        comment.id = x + 1;
        element.comments.push(comment);
      }
    }

    expect(result).toEqual();
  });
});
