import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LawerCityModule } from './city/city.module';
import { LawerDistrictModule } from './district/district.module';
import { LawerStreetModule } from './street/street.module';
import { LawerUserProfileModule } from './user-profile/user-profile.module';
import { LawerAccountsModule } from './accounts/accounts.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LawerCityModule,
        LawerDistrictModule,
        LawerStreetModule,
        LawerUserProfileModule,
        LawerAccountsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LawerEntityModule {}
