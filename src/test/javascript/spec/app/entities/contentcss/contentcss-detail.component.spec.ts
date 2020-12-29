import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FroalaTestModule } from '../../../test.module';
import { ContentcssDetailComponent } from 'app/entities/contentcss/contentcss-detail.component';
import { Contentcss } from 'app/shared/model/contentcss.model';

describe('Component Tests', () => {
  describe('Contentcss Management Detail Component', () => {
    let comp: ContentcssDetailComponent;
    let fixture: ComponentFixture<ContentcssDetailComponent>;
    const route = ({ data: of({ contentcss: new Contentcss(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FroalaTestModule],
        declarations: [ContentcssDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContentcssDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContentcssDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contentcss on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contentcss).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
