import { element, by, promise, ElementFinder } from 'protractor';

export class StreetComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-street div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StreetUpdatePage {
    pageTitle = element(by.id('jhi-street-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    enabledInput = element(by.id('field_enabled'));
    createAtInput = element(by.id('field_createAt'));
    updateAtInput = element(by.id('field_updateAt'));
    districtSelect = element(by.id('field_district'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    getEnabledInput() {
        return this.enabledInput;
    }
    setCreateAtInput(createAt): promise.Promise<void> {
        return this.createAtInput.sendKeys(createAt);
    }

    getCreateAtInput() {
        return this.createAtInput.getAttribute('value');
    }

    setUpdateAtInput(updateAt): promise.Promise<void> {
        return this.updateAtInput.sendKeys(updateAt);
    }

    getUpdateAtInput() {
        return this.updateAtInput.getAttribute('value');
    }

    districtSelectLastOption(): promise.Promise<void> {
        return this.districtSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    districtSelectOption(option): promise.Promise<void> {
        return this.districtSelect.sendKeys(option);
    }

    getDistrictSelect(): ElementFinder {
        return this.districtSelect;
    }

    getDistrictSelectedOption() {
        return this.districtSelect.element(by.css('option:checked')).getText();
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
