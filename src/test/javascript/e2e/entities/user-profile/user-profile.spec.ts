import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { UserProfileComponentsPage, UserProfileUpdatePage } from './user-profile.page-object';
import * as path from 'path';

describe('UserProfile e2e test', () => {
    let navBarPage: NavBarPage;
    let userProfileUpdatePage: UserProfileUpdatePage;
    let userProfileComponentsPage: UserProfileComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserProfiles', () => {
        navBarPage.goToEntity('user-profile');
        userProfileComponentsPage = new UserProfileComponentsPage();
        expect(userProfileComponentsPage.getTitle()).toMatch(/lawerApp.userProfile.home.title/);
    });

    it('should load create UserProfile page', () => {
        userProfileComponentsPage.clickOnCreateButton();
        userProfileUpdatePage = new UserProfileUpdatePage();
        expect(userProfileUpdatePage.getPageTitle()).toMatch(/lawerApp.userProfile.home.createOrEditLabel/);
        userProfileUpdatePage.cancel();
    });

    it('should create and save UserProfiles', () => {
        userProfileComponentsPage.clickOnCreateButton();
        userProfileUpdatePage.setAvatarInput(absolutePath);
        userProfileUpdatePage.setAddressInput('address');
        expect(userProfileUpdatePage.getAddressInput()).toMatch('address');
        userProfileUpdatePage.userSelectLastOption();
        userProfileUpdatePage.save();
        expect(userProfileUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
