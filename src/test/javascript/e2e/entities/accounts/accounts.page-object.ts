import { element, by, promise, ElementFinder } from 'protractor';

export class AccountsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-accounts div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AccountsUpdatePage {
    pageTitle = element(by.id('jhi-accounts-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    loginInput = element(by.id('field_login'));
    nameInput = element(by.id('field_name'));
    emailInput = element(by.id('field_email'));
    activatedInput = element(by.id('field_activated'));
    langKeyInput = element(by.id('field_langKey'));
    avatarInput = element(by.id('file_avatar'));
    createdByInput = element(by.id('field_createdBy'));
    createdDateInput = element(by.id('field_createdDate'));
    lastModifiedByInput = element(by.id('field_lastModifiedBy'));
    lastModifiedDateInput = element(by.id('field_lastModifiedDate'));
    passwordInput = element(by.id('field_password'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setLoginInput(login): promise.Promise<void> {
        return this.loginInput.sendKeys(login);
    }

    getLoginInput() {
        return this.loginInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setEmailInput(email): promise.Promise<void> {
        return this.emailInput.sendKeys(email);
    }

    getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    getActivatedInput() {
        return this.activatedInput;
    }
    setLangKeyInput(langKey): promise.Promise<void> {
        return this.langKeyInput.sendKeys(langKey);
    }

    getLangKeyInput() {
        return this.langKeyInput.getAttribute('value');
    }

    setAvatarInput(avatar): promise.Promise<void> {
        return this.avatarInput.sendKeys(avatar);
    }

    getAvatarInput() {
        return this.avatarInput.getAttribute('value');
    }

    setCreatedByInput(createdBy): promise.Promise<void> {
        return this.createdByInput.sendKeys(createdBy);
    }

    getCreatedByInput() {
        return this.createdByInput.getAttribute('value');
    }

    setCreatedDateInput(createdDate): promise.Promise<void> {
        return this.createdDateInput.sendKeys(createdDate);
    }

    getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
    }

    setLastModifiedByInput(lastModifiedBy): promise.Promise<void> {
        return this.lastModifiedByInput.sendKeys(lastModifiedBy);
    }

    getLastModifiedByInput() {
        return this.lastModifiedByInput.getAttribute('value');
    }

    setLastModifiedDateInput(lastModifiedDate): promise.Promise<void> {
        return this.lastModifiedDateInput.sendKeys(lastModifiedDate);
    }

    getLastModifiedDateInput() {
        return this.lastModifiedDateInput.getAttribute('value');
    }

    setPasswordInput(password): promise.Promise<void> {
        return this.passwordInput.sendKeys(password);
    }

    getPasswordInput() {
        return this.passwordInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
