import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Post, PostsService } from '../post.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  post!: Post;

  miFormulario: FormGroup = this.fb.group({
    id: [0],
    title: ['', Validators.required],
    shortDescription: [''],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['https://source.unsplash.com/random', Validators.required],
    comments: [[]],
  });

  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private postService: PostsService,
    public fb: FormBuilder
  ) {
    if (this.data) {
      this.miFormulario.setValue({
        id: this.data.id,
        title: this.data.title,
        shortDescription: this.data.shortDescription,
        description: this.data.description,
        category: this.data.category,
        image: this.data.image,
        comments: this.data.comments,
      });
    }
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  save() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    if (this.miFormulario.controls['id'].value !== 0) {
      this.postService.editPost(this.miFormulario.value);
    } else {
      this.postService.addPost(this.miFormulario.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return 'Please enter all the required information';
  }
}
