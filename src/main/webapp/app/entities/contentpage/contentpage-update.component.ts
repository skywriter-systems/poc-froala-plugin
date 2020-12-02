/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IContentpage, Contentpage } from 'app/shared/model/contentpage.model';
import { ContentpageService } from './contentpage.service';

import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-contentpage-update',
  templateUrl: './contentpage-update.component.html',
})
export class ContentpageUpdateComponent implements OnInit {
  isSaving = false;
  public options: Object = {
    placeholderText: 'Enter yur content here',
    // paragraphFormatSelection: true,
    paragraphDefaultSelection: 'Normal',
    useClasses: false,
    // paragraphFormat: {
    //   N: 'Normal',
    //   h1: 'Heading 1',
    //   h2: 'Heading 2',
    //   code: 'code',
    // },
    paragraphStyles: {
      class1: 'Class 1',
      class2: 'Class 2',
    },

    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: [
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'subscript',
          'superscript',
          'fontFamily',
          'fontSize',
          'textColor',
          'backgroundColor',
          'inlineClass',
          'inlineStyle',
          'clearFormatting',
        ],
      },
      moreParagraph: {
        buttons: [
          'alignLeft',
          'alignCenter',
          'alignRight',
          'formatOLSimple',
          'alignJustify',
          'formatOL',
          'formatUL',
          'paragraphFormatExtended',
          'paragraphStyle',
          'lineHeight',
          'outdent',
          'indent',
          'quote',
        ],
      },
      moreRich: {
        buttons: [
          'insertLink',
          'insertImage',
          'insertVideo',
          'insertTable',
          'emoticons',
          'fontAwesome',
          'specialCharacters',
          'embedly',
          'insertFile',
          'insertHR',
        ],
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
      },
    },
    paragraphFormatExtended: [
      { title: 'Normal' },
      { tag: 'h1', title: 'Heading 1' },
      { tag: 'h2', title: 'Heading 2' },
      { tag: 'h2', class: 'fr-text-bordered', title: 'Header 2 bordered' },
      { tag: 'pre', id: 'code', title: 'Code' },
    ],
  };

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    contenthtml: [],
  });

  constructor(
    protected contentpageService: ContentpageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentpage }) => {
      this.updateForm(contentpage);
    });

    $(document).ready(() => {
      // $('form').append('<link rel="stylesheet" href="../../../content/css/froala-paragraph-format.css" type="text/css" />');
      return $('form').append(
        $('<link rel="stylesheet" type="text/css" />').attr('href', '../../../content/css/froala-paragraph-format.css')
      );
    });
  }

  updateForm(contentpage: IContentpage): void {
    this.editForm.patchValue({
      id: contentpage.id,
      title: contentpage.title,
      contenthtml: contentpage.contenthtml,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contentpage = this.createFromForm();
    if (contentpage.id !== undefined) {
      this.subscribeToSaveResponse(this.contentpageService.update(contentpage));
    } else {
      this.subscribeToSaveResponse(this.contentpageService.create(contentpage));
    }
  }

  private createFromForm(): IContentpage {
    return {
      ...new Contentpage(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      contenthtml: this.editForm.get(['contenthtml'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContentpage>>): void {
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
