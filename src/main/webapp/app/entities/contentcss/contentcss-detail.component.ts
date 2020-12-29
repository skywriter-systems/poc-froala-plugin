import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContentcss } from 'app/shared/model/contentcss.model';

@Component({
  selector: 'jhi-contentcss-detail',
  templateUrl: './contentcss-detail.component.html',
})
export class ContentcssDetailComponent implements OnInit {
  contentcss: IContentcss | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentcss }) => (this.contentcss = contentcss));
  }

  previousState(): void {
    window.history.back();
  }
}
