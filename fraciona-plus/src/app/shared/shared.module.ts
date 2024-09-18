import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { IonicModule } from '@ionic/angular';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ClickedDirective } from './directives/clicked.directive';

@NgModule({
  declarations: [
    ClickedDirective,
  ],
  imports: [],
  exports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    MatRippleModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    DividerModule,
    FileUploadModule,
    InputTextModule,
    OverlayPanelModule,
    SelectButtonModule,
    TagModule,
    ToastModule,
    ClickedDirective
  ]
})
export class SharedModule { }
