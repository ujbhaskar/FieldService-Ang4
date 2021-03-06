import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FieldjobPage } from '../fieldjob/fieldjob';
import { TimePage } from '../time/time';


/**
 * Generated class for the OnsiteRequirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onsite-requirement',
  templateUrl: 'onsite-requirement.html',
})
export class OnsiteRequirementPage {
  selectedTask;
  notesList;
  noteArray : Array<any> = [];
  attachmentsList;
  attachmentArray;
  defaultTasks = ["1/2 SOCKET", "Cage Retainer Tool", "Power Torque Erench", "Plyers", "3/4 SOCKET"];
  dummyArr = ["1","2","3"];
  tasks = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService : ApiProvider) {
    this.selectedTask = this.navParams.get("selTask");
  }

  ionViewDidLoad() {
    this.getNotesForSelectedTask();
    this.getAttachmentsForSelectedTask();
  }
  goToDetails(){
    
    this.navCtrl.push(FieldjobPage, {"task": this.selectedTask}).then(()=>{
      const startIndex = this.navCtrl.getActive().index - 1;
      this.navCtrl.remove(startIndex, 1);
    });
  }

  getNotesForSelectedTask(){
    this.apiService.getNotes().subscribe(data => {
      this.notesList = data;
      this.notesList.Notes.forEach(element => {
        if(this.selectedTask.Task_Number == element.Task_Number){
          this.noteArray.push(element);
        }
      });
      console.log(this.noteArray);
    })
  }

  getAttachmentsForSelectedTask(){
    this.apiService.getAttachments().subscribe(data => {
      this.attachmentsList = data;
      this.attachmentArray = this.attachmentsList.Attachments_Info;
      console.log(this.attachmentArray);
    })
  }

  goToDebrief(){
    this.navCtrl.push(TimePage);
  }
}
