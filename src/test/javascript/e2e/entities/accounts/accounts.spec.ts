import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { AccountsComponentsPage, AccountsUpdatePage } from './accounts.page-object';
import * as path from 'path';

describe('Accounts e2e test', () => {
    let navBarPage: NavBarPage;
    let accountsUpdatePage: AccountsUpdatePage;
    let accountsComponentsPage: AccountsComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Accounts', () => {
        navBarPage.goToEntity('accounts');
        accountsComponentsPage = new AccountsComponentsPage();
        expect(accountsComponentsPage.getTitle()).toMatch(/lawerApp.accounts.home.title/);
    });

    it('should load create Accounts page', () => {
        accountsComponentsPage.clickOnCreateButton();
        accountsUpdatePage = new AccountsUpdatePage();
        expect(accountsUpdatePage.getPageTitle()).toMatch(/lawerApp.accounts.home.createOrEditLabel/);
        accountsUpdatePage.cancel();
    });

    it('should create and save Accounts', () => {
        accountsComponentsPage.clickOnCreateButton();
        accountsUpdatePage.setLoginInput('login');
        expect(accountsUpdatePage.getLoginInput()).toMatch('login');
        accountsUpdatePage.setNameInput('name');
        expect(accountsUpdatePage.getNameInput()).toMatch('name');
        accountsUpdatePage.setEmailInput('email');
        expect(accountsUpdatePage.getEmailInput()).toMatch('email');
        accountsUpdatePage
            .getActivatedInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    accountsUpdatePage.getActivatedInput().click();
                    expect(accountsUpdatePage.getActivatedInput().isSelected()).toBeFalsy();
                } else {
                    accountsUpdatePage.getActivatedInput().click();
                    expect(accountsUpdatePage.getActivatedInput().isSelected()).toBeTruthy();
                }
            });
        accountsUpdatePage.setLangKeyInput('langKey');
        expect(accountsUpdatePage.getLangKeyInput()).toMatch('langKey');
        accountsUpdatePage.setAvatarInput(absolutePath);
        accountsUpdatePage.setCreatedByInput('createdBy');
        expect(accountsUpdatePage.getCreatedByInput()).toMatch('createdBy');
        accountsUpdatePage.setCreatedDateInput('2000-12-31');
        expect(accountsUpdatePage.getCreatedDateInput()).toMatch('2000-12-31');
        accountsUpdatePage.setLastModifiedByInput('lastModifiedBy');
        expect(accountsUpdatePage.getLastModifiedByInput()).toMatch('lastModifiedBy');
        accountsUpdatePage.setLastModifiedDateInput('2000-12-31');
        expect(accountsUpdatePage.getLastModifiedDateInput()).toMatch('2000-12-31');
        accountsUpdatePage.setPasswordInput('password');
        expect(accountsUpdatePage.getPasswordInput()).toMatch('password');
        accountsUpdatePage.save();
        expect(accountsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
