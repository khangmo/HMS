import { element, by, promise, ElementFinder } from 'protractor';

export class CityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-city div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CityUpdatePage {
    pageTitle = element(by.id('jhi-city-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    enabledInput = element(by.id('field_enabled'));
    createAtInput = element(by.id('field_createAt'));
    updateAtInput = element(by.id('field_updateAt'));

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
