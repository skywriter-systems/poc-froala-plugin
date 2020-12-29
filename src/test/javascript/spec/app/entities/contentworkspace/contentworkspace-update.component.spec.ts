import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FroalaTestModule } from '../../../test.module';
import { ContentworkspaceUpdateComponent } from 'app/entities/contentworkspace/contentworkspace-update.component';
import { ContentworkspaceService } from 'app/entities/contentworkspace/contentworkspace.service';
import { Contentworkspace } from 'app/shared/model/contentworkspace.model';

describe('Component Tests', () => {
  describe('Contentworkspace Management Update Component', () => {
    let comp: ContentworkspaceUpdateComponent;
    let fixture: ComponentFixture<ContentworkspaceUpdateComponent>;
    let service: ContentworkspaceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FroalaTestModule],
        declarations: [ContentworkspaceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ContentworkspaceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContentworkspaceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContentworkspaceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Contentworkspace(123);
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
        const entity = new Contentworkspace();
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
