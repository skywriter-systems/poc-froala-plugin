/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-this-alias */
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

import FroalaEditor from 'froala-editor';
import { element } from 'protractor';
require('froala-editor-paragraph-format-extended-plugin');

@Component({
  selector: 'jhi-contentpage-update',
  templateUrl: './contentpage-update.component.html',
})
export class ContentpageUpdateComponent implements OnInit {
  isSaving = false;
  public options: Object = {
    useClasses: false,
    placeholderText: 'Enter yur content here',
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
          // 'paragraphFormat',
          'paragraphFormatExtended',
          'paragraphStyle',
          'myDropdown',
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
      { tag: 'N', title: 'Normal' },
      { tag: 'h1', title: 'Heading 1' },
      { tag: 'h2', title: 'Heading 2' },
      { tag: 'code', title: 'Code' },
      // { tag: 'h2', class: 'fr-text-bordered', title: 'H-2 bordered' },
    ],
  };

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    contenthtml: [],
  });
  currentHtml: any;
  contenthtmlLink: any;

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
      // $('#field_contenthtml').froalaEditor({});
      // $('#field_contenthtml').froalaEditor('edit.off');
      return $('form').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../../../content/css/3rd-copy.css'));
    });

    FroalaEditor.DefineIcon('myDropdown', { NAME: 'cog', SVG_KEY: 'cogs' });
    const self = this;
    // Define a dropdown button.
    FroalaEditor.RegisterCommand('myDropdown', {
      // Button title.
      title: 'choose css',
      type: 'dropdown',
      focus: false,
      undo: false,
      refreshAfterCallback: true,
      options: {
        '../../../content/css/3rd-copy.css': '3rd-copy',
        '../../../content/css/4th-copy.css': '4th-copy',
      },
      // Callback.
      callback(cmd: any, val: any, params: any): void {
        const newSS = document.createElement('link');
        newSS.rel = 'stylesheet';
        newSS.href = val;
        newSS.type = 'text/css';
        $(document).ready(() => {
          // $('form').append('<link rel="stylesheet" href="../../../content/css/froala-paragraph-format.css" type="text/css" />');
          // $('#field_contenthtml').froalaEditor({});
          // $('#field_contenthtml').froalaEditor('edit.off');
          $('form > link').remove();
          $('form').append($('<link rel="stylesheet" type="text/css" />').attr('href', val));

          setTimeout(() => {
            self.currentHtml = this.html.get();
            self.contenthtmlLink = this.html
              .get()
              .replace(/\s*style=(["'])(.*?)\1/gim, '')
              .replace(/<\//gi, `  <link rel="stylesheet" href=${val} type="text/css" /></`);

            // console.log(this.html.get().replace(/\s*style=(["'])(.*?)\1/gmi, '').replace(/<\//ig, `  <link rel="stylesheet" href=${val} type="text/css" /></`));
            // console.log(this.html.get().replace(/style='[^']'/, '').replace(/<\//ig, `  <link rel="stylesheet" href=${val} type="text/css" /></`));
            // console.log(this.html.get().replace(/fr-original-style=["'](.*)["']/, '').replcae(/.$/));
            // console.log(this.html.get().replace(/<\//ig, `  <link rel="stylesheet" href=${val} type="text/css" /></`));
            // console.log(self.currentHtml);
          }, 200);
        });
      },
    });
  }
  updateForm(contentpage: IContentpage): void {
    this.editForm.patchValue({
      id: contentpage.id,
      title: contentpage.title,
      contenthtml: contentpage.contenthtml,
      contenthtmllink: contentpage.contenthtmllink,
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
      contenthtml: this.currentHtml,
      contenthtmllink: this.contenthtmlLink,
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
