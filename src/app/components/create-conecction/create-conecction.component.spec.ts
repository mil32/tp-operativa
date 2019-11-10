import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConecctionComponent } from './create-conecction.component';

describe('CreateConecctionComponent', () => {
  let component: CreateConecctionComponent;
  let fixture: ComponentFixture<CreateConecctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConecctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConecctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
