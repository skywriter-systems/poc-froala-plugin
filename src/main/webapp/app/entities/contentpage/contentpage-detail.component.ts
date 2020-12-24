import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IContentpage } from 'app/shared/model/contentpage.model';
import * as $ from 'jquery';

@Component({
  selector: 'jhi-contentpage-detail',
  templateUrl: './contentpage-detail.component.html',
})
export class ContentpageDetailComponent implements OnInit {
  contentpage: IContentpage | null = null;

  constructor(protected activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentpage }) => (this.contentpage = contentpage));
    $(document).ready(() => {
      return $('dd').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../../../content/css/3rd-copy.css'));
    });
    setTimeout(() => {
      document.querySelectorAll('[fr-original-class]').forEach(element => {
        element.outerHTML = element.outerHTML.replace('fr-original-class', 'class');
        const x = element.getAttribute('fr-original-class');
        element.setAttribute('class', `${x}`);
        element.removeAttribute('fr-original-class');
      });
    }, 100);
  }

  public secureCntent(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  previousState(): void {
    window.history.back();
  }
}
