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
// import { Contentcss } from 'app/shared/model/contentcss.model';
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
  contentcss!: any[];
  cssOptions = {
    '../../../content/css/3rd-copy.css': '3rd-copy',
    '../../../content/css/4th-copy.css': '4th-copy',
  };
  editorContent: any;
  // cssOption: any[] = new Array();
  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    contenthtml: [],
    contenthtmllink: [],
    contentcss: [],
  });
  currentHtml: any;
  contenthtmlLink: any;

  constructor(
    protected contentpageService: ContentpageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer
  ) {}

  cssFileCahnge(val: string, name: string): void {
    $(document).ready(() => {
      $('form > link').remove();
      $('form').append($('<link rel="stylesheet" type="text/css" />').attr('href', val));
      // console.log(this.html.get());
      setTimeout(() => {
        const editor = new FroalaEditor('#field_contenthtml', {}, function (): void {});

        this.currentHtml = editor.html.get();
        this.contenthtmlLink = editor.html
          .get()
          .replace(/\s*style=(["'])(.*?)\1/gim, '')
          .replace(/fr-original-/, '')
          .replace(/>$/, `><link rel="stylesheet" href=${val} type="text/css" />`);
        // .replace(/<\//gi, `  <link rel="stylesheet" href=${val} type="text/css" /></`);
        // console.log(self.contenthtmlLink);
        this.contentcss = new Array<any>();
        this.contentcss.push({ csspath: val, cssname: name, id: null });
      }, 200);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentpage }) => {
      this.updateForm(contentpage);
      console.error(contentpage);

      if (contentpage.contentcss) {
        console.error('ttttttttttttttttttttttttttttttttttttttttttttttttttt');

        $('form').append($('<link rel="stylesheet" type="text/css" />').attr('href', contentpage.contentcss[0].csspath));
        this.contentcss = contentpage.contentcss;
        console.error(this.contentcss);
      } else {
        $(document).ready(() => {
          // $('form').append('<link rel="stylesheet" href="../../../content/css/froala-paragraph-format.css" type="text/css" />');
          $('form').append($('<link rel="stylesheet" type="text/css" />').attr('href', '../../../content/css/3rd-copy.css'));
          this.contentcss = new Array<any>();
          this.contentcss.push({ csspath: '../../../content/css/3rd-copy.css', cssname: '3rd-copy', id: null });
        });
      }
    });
    // this.contentpageService.getAllCss().subscribe(css => {
    //css.body.forEach((data: any) => {
    //  this.cssOptions[data.csspath] = data.cssname;
    //});
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
      options: this.cssOptions,
      // Callback.
      callback(cmd: any, val: any): void {
        // const newSS = document.createElement('link');
        // newSS.rel = 'stylesheet';
        // newSS.href = val;
        // newSS.type = 'text/css';
        $(document).ready(() => {
          $('form > link').remove();
          $('form').append($('<link rel="stylesheet" type="text/css" />').attr('href', val));
          // console.log(this.html.get());
          setTimeout(() => {
            self.currentHtml = this.html.get();
            self.contenthtmlLink = this.html
              .get()
              .replace(/\s*style=(["'])(.*?)\1/gim, '')
              .replace(/fr-original-/, '')
              .replace(/>$/, `><link rel="stylesheet" href=${val} type="text/css" />`);
            // .replace(/<\//gi, `  <link rel="stylesheet" href=${val} type="text/css" /></`);
            // console.log(self.contenthtmlLink);
            self.contentcss = new Array<any>();
            self.contentcss.push(val);
          }, 200);
        });
      },
    });
    //  });
  }
  updateForm(contentpage: IContentpage): void {
    this.editForm.patchValue({
      id: contentpage.id,
      title: contentpage.title,
      contenthtml: contentpage.contenthtml,
      contenthtmllink: contentpage.contenthtmllink,
      contentcss: contentpage.contentcss,
    });
    this.currentHtml = contentpage.contenthtml;
    this.contenthtmlLink = contentpage.contenthtmllink;
    this.editorContent = contentpage.contenthtml;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contentpage = this.createFromForm();
    console.log(contentpage);

    if (contentpage.id !== undefined) {
      this.subscribeToSaveResponse(this.contentpageService.update(contentpage));
    } else {
      this.subscribeToSaveResponse(this.contentpageService.create(contentpage));
    }
  }

  private createFromForm(): IContentpage {
    const editor = new FroalaEditor('#field_contenthtml', {}, function (): void {});

    return {
      ...new Contentpage(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      contenthtml: editor.html.get(),
      contenthtmllink: editor.html
        .get()
        .replace(/\s*style=(["'])(.*?)\1/gim, '')
        .replace(/fr-original-/, '')
        .replace(/>$/, `><link rel="stylesheet" href=${this.contentcss[0].csspath} type="text/css" />`),
      contentcss: this.contentcss,
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
