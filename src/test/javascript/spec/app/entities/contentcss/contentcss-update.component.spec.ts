import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FroalaTestModule } from '../../../test.module';
import { ContentcssUpdateComponent } from 'app/entities/contentcss/contentcss-update.component';
import { ContentcssService } from 'app/entities/contentcss/contentcss.service';
import { Contentcss } from 'app/shared/model/contentcss.model';

describe('Component Tests', () => {
  describe('Contentcss Management Update Component', () => {
    let comp: ContentcssUpdateComponent;
    let fixture: ComponentFixture<ContentcssUpdateComponent>;
    let service: ContentcssService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FroalaTestModule],
        declarations: [ContentcssUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ContentcssUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContentcssUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContentcssService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Contentcss(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Contentcss();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
