import { PersonalPage } from './../pages/personal/personal';
import { ProjectPage } from './../pages/project/project';
import { LoginPage } from '../pages/login/login';
import  * as Tabs from '../pages/tabs/tabs';

export function getPages() {
  return {
    "loginPage":LoginPage,
    "tabsPage": Tabs.TabsPage,
    "projectPage":ProjectPage,
    "personalPage":PersonalPage
  };
}

export function getPageFor(hash) {
  return getPages()[hash]
}
