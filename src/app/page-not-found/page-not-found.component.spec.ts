import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MainComponent } from '../main/main.component';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }],
      imports: [RouterTestingModule.withRoutes([{ path: 'main', component: MainComponent }])],
      declarations: [PageNotFoundComponent, MainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "main" when click', fakeAsync(() => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/main']);
  }));
});
