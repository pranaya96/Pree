import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDelComponent } from './set-del.component';

describe('SetDelComponent', () => {
  let component: SetDelComponent;
  let fixture: ComponentFixture<SetDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
