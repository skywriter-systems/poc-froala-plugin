import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContentworkspace } from 'app/shared/model/contentworkspace.model';
import { ContentworkspaceService } from './contentworkspace.service';

@Component({
  templateUrl: './contentworkspace-delete-dialog.component.html',
})
export class ContentworkspaceDeleteDialogComponent {
  contentworkspace?: IContentworkspace;

  constructor(
    protected contentworkspaceService: ContentworkspaceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contentworkspaceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contentworkspaceListModification');
      this.activeModal.close();
    });
  }
}
