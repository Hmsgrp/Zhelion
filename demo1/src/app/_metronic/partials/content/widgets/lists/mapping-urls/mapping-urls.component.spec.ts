import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingUrlsComponent } from './mapping-urls.component';

describe('MappingUrlsComponent', () => {
  let component: MappingUrlsComponent;
  let fixture: ComponentFixture<MappingUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingUrlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
