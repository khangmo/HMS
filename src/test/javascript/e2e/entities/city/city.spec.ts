import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CityComponentsPage, CityUpdatePage } from './city.page-object';

describe('City e2e test', () => {
    let navBarPage: NavBarPage;
    let cityUpdatePage: CityUpdatePage;
    let cityComponentsPage: CityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cities', () => {
        navBarPage.goToEntity('city');
        cityComponentsPage = new CityComponentsPage();
        expect(cityComponentsPage.getTitle()).toMatch(/lawerApp.city.home.title/);
    });

    it('should load create City page', () => {
        cityComponentsPage.clickOnCreateButton();
        cityUpdatePage = new CityUpdatePage();
        expect(cityUpdatePage.getPageTitle()).toMatch(/lawerApp.city.home.createOrEditLabel/);
        cityUpdatePage.cancel();
    });

    it('should create and save Cities', () => {
        cityComponentsPage.clickOnCreateButton();
        cityUpdatePage.setNameInput('name');
        expect(cityUpdatePage.getNameInput()).toMatch('name');
        cityUpdatePage
            .getEnabledInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    cityUpdatePage.getEnabledInput().click();
                    expect(cityUpdatePage.getEnabledInput().isSelected()).toBeFalsy();
                } else {
                    cityUpdatePage.getEnabledInput().click();
                    expect(cityUpdatePage.getEnabledInput().isSelected()).toBeTruthy();
                }
            });
        cityUpdatePage.setCreateAtInput('2000-12-31');
        expect(cityUpdatePage.getCreateAtInput()).toMatch('2000-12-31');
        cityUpdatePage.setUpdateAtInput('2000-12-31');
        expect(cityUpdatePage.getUpdateAtInput()).toMatch('2000-12-31');
        cityUpdatePage.save();
        expect(cityUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
