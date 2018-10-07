import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { DistrictComponentsPage, DistrictUpdatePage } from './district.page-object';

describe('District e2e test', () => {
    let navBarPage: NavBarPage;
    let districtUpdatePage: DistrictUpdatePage;
    let districtComponentsPage: DistrictComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Districts', () => {
        navBarPage.goToEntity('district');
        districtComponentsPage = new DistrictComponentsPage();
        expect(districtComponentsPage.getTitle()).toMatch(/lawerApp.district.home.title/);
    });

    it('should load create District page', () => {
        districtComponentsPage.clickOnCreateButton();
        districtUpdatePage = new DistrictUpdatePage();
        expect(districtUpdatePage.getPageTitle()).toMatch(/lawerApp.district.home.createOrEditLabel/);
        districtUpdatePage.cancel();
    });

    it('should create and save Districts', () => {
        districtComponentsPage.clickOnCreateButton();
        districtUpdatePage.setNameInput('name');
        expect(districtUpdatePage.getNameInput()).toMatch('name');
        districtUpdatePage
            .getEnabledInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    districtUpdatePage.getEnabledInput().click();
                    expect(districtUpdatePage.getEnabledInput().isSelected()).toBeFalsy();
                } else {
                    districtUpdatePage.getEnabledInput().click();
                    expect(districtUpdatePage.getEnabledInput().isSelected()).toBeTruthy();
                }
            });
        districtUpdatePage.setCreateAtInput('2000-12-31');
        expect(districtUpdatePage.getCreateAtInput()).toMatch('2000-12-31');
        districtUpdatePage.setUpdateAtInput('2000-12-31');
        expect(districtUpdatePage.getUpdateAtInput()).toMatch('2000-12-31');
        districtUpdatePage.citySelectLastOption();
        districtUpdatePage.save();
        expect(districtUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
