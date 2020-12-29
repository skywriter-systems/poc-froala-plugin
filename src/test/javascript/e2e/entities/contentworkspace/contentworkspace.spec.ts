import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContentworkspaceComponentsPage, ContentworkspaceDeleteDialog, ContentworkspaceUpdatePage } from './contentworkspace.page-object';

const expect = chai.expect;

describe('Contentworkspace e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contentworkspaceComponentsPage: ContentworkspaceComponentsPage;
  let contentworkspaceUpdatePage: ContentworkspaceUpdatePage;
  let contentworkspaceDeleteDialog: ContentworkspaceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Contentworkspaces', async () => {
    await navBarPage.goToEntity('contentworkspace');
    contentworkspaceComponentsPage = new ContentworkspaceComponentsPage();
    await browser.wait(ec.visibilityOf(contentworkspaceComponentsPage.title), 5000);
    expect(await contentworkspaceComponentsPage.getTitle()).to.eq('froalaApp.contentworkspace.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(contentworkspaceComponentsPage.entities), ec.visibilityOf(contentworkspaceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Contentworkspace page', async () => {
    await contentworkspaceComponentsPage.clickOnCreateButton();
    contentworkspaceUpdatePage = new ContentworkspaceUpdatePage();
    expect(await contentworkspaceUpdatePage.getPageTitle()).to.eq('froalaApp.contentworkspace.home.createOrEditLabel');
    await contentworkspaceUpdatePage.cancel();
  });

  it('should create and save Contentworkspaces', async () => {
    const nbButtonsBeforeCreate = await contentworkspaceComponentsPage.countDeleteButtons();

    await contentworkspaceComponentsPage.clickOnCreateButton();

    await promise.all([contentworkspaceUpdatePage.setNameInput('name'), contentworkspaceUpdatePage.contentcssSelectLastOption()]);

    expect(await contentworkspaceUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await contentworkspaceUpdatePage.save();
    expect(await contentworkspaceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contentworkspaceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last Contentworkspace', async () => {
    const nbButtonsBeforeDelete = await contentworkspaceComponentsPage.countDeleteButtons();
    await contentworkspaceComponentsPage.clickOnLastDeleteButton();

    contentworkspaceDeleteDialog = new ContentworkspaceDeleteDialog();
    expect(await contentworkspaceDeleteDialog.getDialogTitle()).to.eq('froalaApp.contentworkspace.delete.question');
    await contentworkspaceDeleteDialog.clickOnConfirmButton();

    expect(await contentworkspaceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
