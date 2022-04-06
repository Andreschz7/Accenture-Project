import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FilterPipe } from '../filter.pipe';
import { FormsComponent } from '../forms/forms.component';
import { PostsService, Post } from '../post.service';
import { MainComponent } from './main.component';

class PostsServiceMock {
  getPosts() {
    return of([]);
  }
}

class MatDialogMock {
  open(components: any, config: any) {
    () => of(true);
  }
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let post: Post;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: PostsService, useClass: PostsServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
      ],
      imports: [RouterTestingModule],
      declarations: [MainComponent, FilterPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open Add Dialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDialogAdd();
    expect(component.dialog.open).toHaveBeenCalledWith(FormsComponent, {
      width: '525px',
    });
  });

  it('should open Edit Dialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDialogEdit(post);
    expect(component.dialog.open).toHaveBeenCalledWith(FormsComponent, {
      width: '525px',
      data: post,
    });
  });
});
