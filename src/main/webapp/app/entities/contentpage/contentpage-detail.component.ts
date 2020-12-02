import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IContentpage } from 'app/shared/model/contentpage.model';

@Component({
  selector: 'jhi-contentpage-detail',
  templateUrl: './contentpage-detail.component.html',
})
export class ContentpageDetailComponent implements OnInit {
  contentpage: IContentpage | null = null;

  constructor(protected activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentpage }) => (this.contentpage = contentpage));
  }

  previousState(): void {
    window.history.back();
  }
}
