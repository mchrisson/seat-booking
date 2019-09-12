import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsContainerComponent } from './seats-container.component';

describe('SeatsContainerComponent', () => {
  let component: SeatsContainerComponent;
  let fixture: ComponentFixture<SeatsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
