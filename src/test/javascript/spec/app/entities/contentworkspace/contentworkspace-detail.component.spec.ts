import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FroalaTestModule } from '../../../test.module';
import { ContentworkspaceDetailComponent } from 'app/entities/contentworkspace/contentworkspace-detail.component';
import { Contentworkspace } from 'app/shared/model/contentworkspace.model';

describe('Component Tests', () => {
  describe('Contentworkspace Management Detail Component', () => {
    let comp: ContentworkspaceDetailComponent;
    let fixture: ComponentFixture<ContentworkspaceDetailComponent>;
    const route = ({ data: of({ contentworkspace: new Contentworkspace(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FroalaTestModule],
        declarations: [ContentworkspaceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContentworkspaceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContentworkspaceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contentworkspace on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contentworkspace).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
