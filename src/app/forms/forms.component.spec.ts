import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { PostsService } from '../post.service';

import { FormsComponent } from './forms.component';

class PostsServiceMock {
  getPosts() {
    return of([]);
  }
}

describe('FormsComponent', () => {
  let component: FormsComponent;
  let fixture: ComponentFixture<FormsComponent>;
  let fb: FormBuilder;

  class MatDialogMock {
    open() {
      return () => of(true);
    }
  }

  beforeEach(async () => {
    // component.miFormulario = fb.group({
    //   id: [0],
    //   title: ['', Validators.required],
    //   shortDescription: [''],
    //   description: ['', Validators.required],
    //   category: ['', Validators.required],
    //   image: ['https://source.unsplash.com/random', Validators.required],
    //   comments: [[]],
    // });
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useClass: MatDialogMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            data: {
              id: '0',
              title: 'Sunset',
              shortDescription: 'shortDescription',
              description: 'description',
              category: 'travel',
              image: 'image',
              comments: [],
            },
          },
        },
        { provide: PostsService, useClass: PostsServiceMock },
        FormBuilder,
      ],
      declarations: [FormsComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate', () => {
    let campo: string = 'title';
    expect(component.campoEsValido(campo)).toBeTruthy();
  });

  it('should return error Message', () => {
    expect(component.getErrorMessage()).toEqual(
      'Please enter all the required information'
    );
  });
});
