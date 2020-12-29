import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContentcss } from 'app/shared/model/contentcss.model';
import { ContentcssService } from './contentcss.service';

@Component({
  templateUrl: './contentcss-delete-dialog.component.html',
})
export class ContentcssDeleteDialogComponent {
  contentcss?: IContentcss;

  constructor(
    protected contentcssService: ContentcssService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contentcssService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contentcssListModification');
      this.activeModal.close();
    });
  }
}
