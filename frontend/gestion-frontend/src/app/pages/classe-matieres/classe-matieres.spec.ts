import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasseMatieres } from './classe-matieres';

describe('ClasseMatieres', () => {
  let component: ClasseMatieres;
  let fixture: ComponentFixture<ClasseMatieres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasseMatieres],
    }).compileComponents();

    fixture = TestBed.createComponent(ClasseMatieres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
