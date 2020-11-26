import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FroalaTestModule } from '../../../test.module';
import { ContentpageDetailComponent } from 'app/entities/contentpage/contentpage-detail.component';
import { Contentpage } from 'app/shared/model/contentpage.model';

describe('Component Tests', () => {
  describe('Contentpage Management Detail Component', () => {
    let comp: ContentpageDetailComponent;
    let fixture: ComponentFixture<ContentpageDetailComponent>;
    const route = ({ data: of({ contentpage: new Contentpage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FroalaTestModule],
        declarations: [ContentpageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContentpageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContentpageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contentpage on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contentpage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
