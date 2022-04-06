import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe } from './filter.pipe';
import { Post } from './post.service';

describe('filter pipe', () => {
  it('should create', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter category matching a filterString', () => {
    const pipe = new FilterPipe();
    const value: any = [
      { title: 'titulo', category: 'travel' },
      { title: 'city', category: 'business' },
    ];
    const filterString: string = 'all';
    const resultArray: any[] = [];
    const propName: string = 'category';
    const result = pipe.transform(value, filterString, propName);

    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    expect(result).toEqual([
      { title: 'titulo', category: 'travel' },
      { title: 'city', category: 'business' },
    ]);
  });

  it('should filter category matching a filterString all', () => {
    const pipe = new FilterPipe();
    const value: any = [
      { title: 'titulo', category: 'travel' },
      { title: 'city', category: 'business' },
    ];
    const filterString: string = 'travel';
    const resultArray: any[] = [];
    const propName: string = 'category';
    const result = pipe.transform(value, filterString, propName);

    for (const item of value) {
      if (filterString === 'all') {
        resultArray.push(item);
      }
    }
    expect(result).toEqual([{ title: 'titulo', category: 'travel' }]);
  });
});
