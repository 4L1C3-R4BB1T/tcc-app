import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TabRoutingModule } from './tab-routing.module';
import { TabComponent } from './tab.component';

@NgModule({
  declarations: [
    TabComponent,
    HomePageComponent
  ],
  imports: [
    TabRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class TabModule { }
