/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContentpage } from 'app/shared/model/contentpage.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { addConsoleHandler } from 'selenium-webdriver/lib/logging';

@Component({
  selector: 'jhi-contentpage-detail',
  templateUrl: './contentpage-detail.component.html',
})
export class ContentpageDetailComponent implements OnInit {
  contentpage: IContentpage | null = null;

  // Defines FormGroup
  viewForm = this.fb.group({
    id: [],
    title: [],
    contenthtml: [],
  });

  // Added constructor for fb: FormBuilder
  constructor(protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Subscribing data to contentpage
    this.activatedRoute.data.subscribe(({ contentpage }) => (this.contentpage = contentpage));
    // Subscribing data to contentpage using updateFrom function
    this.activatedRoute.data.subscribe(({ contentpage }) => {
      this.updateForm(contentpage);
    });
  }

  // Populates viewform with data
  updateForm(contentpage: IContentpage): void {
    this.viewForm.patchValue({
      id: contentpage.id,
      title: contentpage.title,
      contenthtml: contentpage.contenthtml,
    });
    // Getting all Data from viewform
    console.warn(this.viewForm.value);
    // Getting Data for title from viewform
    console.warn(this.viewForm.controls['title'].value);
  }

  previousState(): void {
    window.history.back();
  }
}
