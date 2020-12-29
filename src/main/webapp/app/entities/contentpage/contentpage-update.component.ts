import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContentpage, Contentpage } from 'app/shared/model/contentpage.model';
import { ContentpageService } from './contentpage.service';

@Component({
  selector: 'jhi-contentpage-update',
  templateUrl: './contentpage-update.component.html',
})
export class ContentpageUpdateComponent implements OnInit {
  isSaving = false;
  contentpages: IContentpage[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    contenthtml: [],
    contentpageparent: [],
  });

  constructor(protected contentpageService: ContentpageService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentpage }) => {
      this.updateForm(contentpage);

      this.contentpageService.query().subscribe((res: HttpResponse<IContentpage[]>) => (this.contentpages = res.body || []));
    });
  }

  updateForm(contentpage: IContentpage): void {
    this.editForm.patchValue({
      id: contentpage.id,
      title: contentpage.title,
      contenthtml: contentpage.contenthtml,
      contentpageparent: contentpage.contentpageparent,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contentpage = this.createFromForm();
    if (contentpage.id !== undefined) {
      this.subscribeToSaveResponse(this.contentpageService.update(contentpage));
    } else {
      this.subscribeToSaveResponse(this.contentpageService.create(contentpage));
    }
  }

  private createFromForm(): IContentpage {
    return {
      ...new Contentpage(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      contenthtml: this.editForm.get(['contenthtml'])!.value,
      contentpageparent: this.editForm.get(['contentpageparent'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContentpage>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IContentpage): any {
    return item.id;
  }
}
