import { Location } from '@angular/common';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostsComponent } from './posts/posts.component';

describe('Router: AppComponent', () => {
  let location : Location;
  let router : Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: '', pathMatch: 'full', redirectTo: 'main' },
        { path: 'main', component: MainComponent },
        { path: 'posts/:id', component: PostsComponent },
        { path: '**', component: PageNotFoundComponent },
      ])],
      declarations: [ 
        MainComponent,
        PostsComponent,
        PageNotFoundComponent,
        AppComponent ]
    })
  });

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
  }));

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /main', fakeAsync(() => {
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/main");
    });
  }));

  it('navigate to "main" redirects you to /main', fakeAsync(() => {
    router.navigate(["main"]).then(() => {
      expect(location.path()).toBe("/main");
    });
  }));

  it('navigate to "posts/:id" redirects you to /posts/:id', fakeAsync(() => {
    router.navigate(["posts/:id"]).then(() => {
      expect(location.path()).toBe("/posts/:id");
    });
  }));

  it('navigate to "**" redirects you to /**', fakeAsync(() => {
    router.navigate(["**"]).then(() => {
      expect(location.path()).toBe("/**");
    });
  }));
});