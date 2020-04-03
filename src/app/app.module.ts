
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/Login/Login.component';

import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './Service/user.service';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { HttpService } from './Service/http.service';

import { DashboardComponent } from './component/dashboard/dashboard.component';

import { SetPasswordComponent } from './component/set-password/set-password.component';

import { NoteComponent } from './component/note/note.component'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
// import {MatNativeDateModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Noteservice } from './Service/note.service';
import { IconComponent } from './component/icon/icon.component';
import { NoteComComponent } from './component/note-com/note-com.component';
import { NoteupdateComponent } from './component/noteupdate/noteupdate.component';
import { PinComponent } from './component/pin/pin.component';
// import { EditlabelComponent } from './component/editlabel/editlabel.component';
import { GetLabelComponent } from './component/get-label/get-label.component';
import { ArchieveComponent } from './component/archieve/archieve.component';
import { TrashComponent } from './component/trash/trash.component';
import { LabelsComponent } from './component/labels/labels.component';
import { AddlabelComponent } from './component/addlabel/addlabel.component';
import { PincompComponent } from './component/pincomp/pincomp.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetpasswordComponent,
    DashboardComponent,
    SetPasswordComponent,
    NoteComponent,
    IconComponent,
    NoteComComponent,
    NoteupdateComponent,
    PinComponent,
    // EditlabelComponent,
    GetLabelComponent,
    ArchieveComponent,
    TrashComponent,
    LabelsComponent,
    AddlabelComponent,
    PincompComponent,
    
    
  ],
  imports: [
    A11yModule,PortalModule,ScrollingModule,CdkStepperModule,CdkTableModule,CdkTreeModule,DragDropModule,
MatBadgeModule,MatAutocompleteModule,MatBottomSheetModule,MatButtonToggleModule,MatCheckboxModule,MatChipsModule
,MatDatepickerModule,MatExpansionModule,MatDialogModule,MatGridListModule,MatPaginatorModule,MatProgressBarModule,
MatProgressSpinnerModule,MatRadioModule,MatRippleModule,MatSelectModule,MatSliderModule,MatSortModule,
MatStepperModule,MatTableModule,MatTabsModule,MatTreeModule,MatSlideToggleModule,MatTooltipModule,
  
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule, 
    FlexLayoutModule,
  ],
  
  providers: [HttpService,UserService,Noteservice],
  bootstrap: [AppComponent]
})
export class AppModule { }