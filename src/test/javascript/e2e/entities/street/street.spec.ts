import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { StreetComponentsPage, StreetUpdatePage } from './street.page-object';

describe('Street e2e test', () => {
    let navBarPage: NavBarPage;
    let streetUpdatePage: StreetUpdatePage;
    let streetComponentsPage: StreetComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Streets', () => {
        navBarPage.goToEntity('street');
        streetComponentsPage = new StreetComponentsPage();
        expect(streetComponentsPage.getTitle()).toMatch(/lawerApp.street.home.title/);
    });

    it('should load create Street page', () => {
        streetComponentsPage.clickOnCreateButton();
        streetUpdatePage = new StreetUpdatePage();
        expect(streetUpdatePage.getPageTitle()).toMatch(/lawerApp.street.home.createOrEditLabel/);
        streetUpdatePage.cancel();
    });

    it('should create and save Streets', () => {
        streetComponentsPage.clickOnCreateButton();
        streetUpdatePage.setNameInput('name');
        expect(streetUpdatePage.getNameInput()).toMatch('name');
        streetUpdatePage
            .getEnabledInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    streetUpdatePage.getEnabledInput().click();
                    expect(streetUpdatePage.getEnabledInput().isSelected()).toBeFalsy();
                } else {
                    streetUpdatePage.getEnabledInput().click();
                    expect(streetUpdatePage.getEnabledInput().isSelected()).toBeTruthy();
                }
            });
        streetUpdatePage.setCreateAtInput('2000-12-31');
        expect(streetUpdatePage.getCreateAtInput()).toMatch('2000-12-31');
        streetUpdatePage.setUpdateAtInput('2000-12-31');
        expect(streetUpdatePage.getUpdateAtInput()).toMatch('2000-12-31');
        streetUpdatePage.districtSelectLastOption();
        streetUpdatePage.save();
        expect(streetUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
