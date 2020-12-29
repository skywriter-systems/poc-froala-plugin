import { element, by, ElementFinder } from 'protractor';

export class ContentpageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contentpage div table .btn-danger'));
  title = element.all(by.css('jhi-contentpage div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ContentpageUpdatePage {
  pageTitle = element(by.id('jhi-contentpage-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  contenthtmlInput = element(by.id('field_contenthtml'));

  contentcssSelect = element(by.id('field_contentcss'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setContenthtmlInput(contenthtml: string): Promise<void> {
    await this.contenthtmlInput.sendKeys(contenthtml);
  }

  async getContenthtmlInput(): Promise<string> {
    return await this.contenthtmlInput.getAttribute('value');
  }

  async contentcssSelectLastOption(): Promise<void> {
    await this.contentcssSelect.all(by.tagName('option')).last().click();
  }

  async contentcssSelectOption(option: string): Promise<void> {
    await this.contentcssSelect.sendKeys(option);
  }

  getContentcssSelect(): ElementFinder {
    return this.contentcssSelect;
  }

  async getContentcssSelectedOption(): Promise<string> {
    return await this.contentcssSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ContentpageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contentpage-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contentpage'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
