import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('tabs') tabRef: Tabs;

  tab1Root = 'SubplanPage';
  tab2Root = 'EventsPage';
  tab3Root = 'NewsPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let openTab = this.navParams.get('openTab');
    if (openTab) {
      this.tabRef.select(openTab);
    }
  }
}
