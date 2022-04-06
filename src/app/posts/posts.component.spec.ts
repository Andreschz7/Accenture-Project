import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MainComponent } from '../main/main.component';
import { MaterialModule } from '../material.module';
import { Post, PostsService } from '../post.service';
import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockPostsService;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let mockActivatedRouter = {
    params: of({id:0}),
  };

  beforeEach(async () => {
    mockPostsService = {
      post: { image: 'Andres', title: 'title', description: 'description' },
      getPosts: () =>
        of([
          {
            image: 'Andres',
            title: 'title',
            description: 'description',
            id: 0,
            comments: [],
          },
        ]),
    };
    await TestBed.configureTestingModule({
      providers: [
        { provide: PostsService, useValue: mockPostsService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRouter },
        FormBuilder,
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'main', component: MainComponent },
        ]),
        MaterialModule,
      ],
      declarations: [PostsComponent, MainComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.id = 0;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return error Message', () => {
    expect(component.getErrorMessage()).toEqual('You must enter a comment');
  });

  it('should navigate to "main" when click', fakeAsync(() => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/main']);
  }));
});
