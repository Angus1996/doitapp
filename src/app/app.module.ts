import { HisTaskDetailsPage2 } from './../pages/histaskdetails2/histaskdetails2';
import { HisTaskDetailsPage } from './../pages/histaskdetails/histaskdetails';
import { HisTaskPage } from './../pages/histask/histask';
import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { ProjectPage } from './../pages/project/project';
import { ProjectDetailsPage } from './../pages/projectdetails/projectdetails';
import { AddTaskPage } from './../pages/addtask/addtask';
import { TaskDetailsPage } from './../pages/taskdetails/taskdetails';
import { TaskPage } from './../pages/task/task';
import { ProjectUserPage } from './../pages/projectuser/projectuser';
import { TaskDetailsPage2 } from './../pages/taskdetails2/taskdetails2';
import { PersonalPage } from './../pages/personal/personal';
import { PasswordChangePage } from './../pages/passwordChange/passwordChange';

import { CommonInfoUtils } from './../commonUtils/commonInfoUtils';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { InterceptorProvider } from '../commonUtils/interceptorProvider';
import { MyApp } from './app.component';
/*import { HomePage } from '../pages/home/home';*/

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    ProjectPage,
    TaskPage,
    ProjectDetailsPage,
    TaskDetailsPage,
    AddTaskPage,
    ProjectUserPage,
    PersonalPage,
    TaskDetailsPage2,
    PasswordChangePage,
    HisTaskPage,
    HisTaskDetailsPage,
    HisTaskDetailsPage2
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages: 'false',backButtonText: '返回', iconMode:'md',mode: 'md'}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    ProjectPage,
    TaskPage,
    ProjectDetailsPage,
    TaskDetailsPage,
    AddTaskPage,
    ProjectUserPage,
    PersonalPage,
    TaskDetailsPage2,
    PasswordChangePage,
    HisTaskPage,
    HisTaskDetailsPage,
    HisTaskDetailsPage2
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonInfoUtils,
    InterceptorProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
