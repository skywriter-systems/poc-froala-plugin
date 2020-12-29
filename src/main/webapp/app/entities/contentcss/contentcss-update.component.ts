import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContentcss, Contentcss } from 'app/shared/model/contentcss.model';
import { ContentcssService } from './contentcss.service';

@Component({
  selector: 'jhi-contentcss-update',
  templateUrl: './contentcss-update.component.html',
})
export class ContentcssUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    cssurl: [null, [Validators.required]],
  });

  constructor(protected contentcssService: ContentcssService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentcss }) => {
      this.updateForm(contentcss);
    });
  }

  updateForm(contentcss: IContentcss): void {
    this.editForm.patchValue({
      id: contentcss.id,
      name: contentcss.name,
      cssurl: contentcss.cssurl,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contentcss = this.createFromForm();
    if (contentcss.id !== undefined) {
      this.subscribeToSaveResponse(this.contentcssService.update(contentcss));
    } else {
      this.subscribeToSaveResponse(this.contentcssService.create(contentcss));
    }
  }

  private createFromForm(): IContentcss {
    return {
      ...new Contentcss(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      cssurl: this.editForm.get(['cssurl'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContentcss>>): void {
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
}
