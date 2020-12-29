import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContentworkspace } from 'app/shared/model/contentworkspace.model';

@Component({
  selector: 'jhi-contentworkspace-detail',
  templateUrl: './contentworkspace-detail.component.html',
})
export class ContentworkspaceDetailComponent implements OnInit {
  contentworkspace: IContentworkspace | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentworkspace }) => (this.contentworkspace = contentworkspace));
  }

  previousState(): void {
    window.history.back();
  }
}
