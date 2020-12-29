import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContentcssComponentsPage, ContentcssDeleteDialog, ContentcssUpdatePage } from './contentcss.page-object';

const expect = chai.expect;

describe('Contentcss e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contentcssComponentsPage: ContentcssComponentsPage;
  let contentcssUpdatePage: ContentcssUpdatePage;
  let contentcssDeleteDialog: ContentcssDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Contentcsses', async () => {
    await navBarPage.goToEntity('contentcss');
    contentcssComponentsPage = new ContentcssComponentsPage();
    await browser.wait(ec.visibilityOf(contentcssComponentsPage.title), 5000);
    expect(await contentcssComponentsPage.getTitle()).to.eq('froalaApp.contentcss.home.title');
    await browser.wait(ec.or(ec.visibilityOf(contentcssComponentsPage.entities), ec.visibilityOf(contentcssComponentsPage.noResult)), 1000);
  });

  it('should load create Contentcss page', async () => {
    await contentcssComponentsPage.clickOnCreateButton();
    contentcssUpdatePage = new ContentcssUpdatePage();
    expect(await contentcssUpdatePage.getPageTitle()).to.eq('froalaApp.contentcss.home.createOrEditLabel');
    await contentcssUpdatePage.cancel();
  });

  it('should create and save Contentcsses', async () => {
    const nbButtonsBeforeCreate = await contentcssComponentsPage.countDeleteButtons();

    await contentcssComponentsPage.clickOnCreateButton();

    await promise.all([contentcssUpdatePage.setNameInput('name'), contentcssUpdatePage.setCssurlInput('cssurl')]);

    expect(await contentcssUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await contentcssUpdatePage.getCssurlInput()).to.eq('cssurl', 'Expected Cssurl value to be equals to cssurl');

    await contentcssUpdatePage.save();
    expect(await contentcssUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contentcssComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Contentcss', async () => {
    const nbButtonsBeforeDelete = await contentcssComponentsPage.countDeleteButtons();
    await contentcssComponentsPage.clickOnLastDeleteButton();

    contentcssDeleteDialog = new ContentcssDeleteDialog();
    expect(await contentcssDeleteDialog.getDialogTitle()).to.eq('froalaApp.contentcss.delete.question');
    await contentcssDeleteDialog.clickOnConfirmButton();

    expect(await contentcssComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
