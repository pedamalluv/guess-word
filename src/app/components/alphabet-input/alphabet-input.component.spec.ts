import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetInputComponent } from './alphabet-input.component';

describe('AlphabetInputComponent', () => {
  let component: AlphabetInputComponent;
  let fixture: ComponentFixture<AlphabetInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphabetInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphabetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
