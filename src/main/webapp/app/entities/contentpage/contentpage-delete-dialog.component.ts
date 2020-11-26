import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContentpage } from 'app/shared/model/contentpage.model';
import { ContentpageService } from './contentpage.service';

@Component({
  templateUrl: './contentpage-delete-dialog.component.html',
})
export class ContentpageDeleteDialogComponent {
  contentpage?: IContentpage;

  constructor(
    protected contentpageService: ContentpageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contentpageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contentpageListModification');
      this.activeModal.close();
    });
  }
}
