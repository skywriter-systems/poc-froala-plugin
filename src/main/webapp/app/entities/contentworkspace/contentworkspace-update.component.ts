import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContentworkspace, Contentworkspace } from 'app/shared/model/contentworkspace.model';
import { ContentworkspaceService } from './contentworkspace.service';
import { IContentcss } from 'app/shared/model/contentcss.model';
import { ContentcssService } from 'app/entities/contentcss/contentcss.service';

@Component({
  selector: 'jhi-contentworkspace-update',
  templateUrl: './contentworkspace-update.component.html',
})
export class ContentworkspaceUpdateComponent implements OnInit {
  isSaving = false;
  contentcsses: IContentcss[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    contentcss: [],
  });

  constructor(
    protected contentworkspaceService: ContentworkspaceService,
    protected contentcssService: ContentcssService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentworkspace }) => {
      this.updateForm(contentworkspace);

      this.contentcssService.query().subscribe((res: HttpResponse<IContentcss[]>) => (this.contentcsses = res.body || []));
    });
  }

  updateForm(contentworkspace: IContentworkspace): void {
    this.editForm.patchValue({
      id: contentworkspace.id,
      name: contentworkspace.name,
      contentcss: contentworkspace.contentcss,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contentworkspace = this.createFromForm();
    if (contentworkspace.id !== undefined) {
      this.subscribeToSaveResponse(this.contentworkspaceService.update(contentworkspace));
    } else {
      this.subscribeToSaveResponse(this.contentworkspaceService.create(contentworkspace));
    }
  }

  private createFromForm(): IContentworkspace {
    return {
      ...new Contentworkspace(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      contentcss: this.editForm.get(['contentcss'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContentworkspace>>): void {
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

  trackById(index: number, item: IContentcss): any {
    return item.id;
  }
}
