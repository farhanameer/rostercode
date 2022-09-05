import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-update',
  templateUrl: './section-update.component.html',
  styleUrls: ['./section-update.component.css', '../sections-shared.css']
})
export class SectionUpdateComponent implements OnInit {

  storage = 'assets/images/';
  updates = [
    {
      icon: this.storage + 'ico_approved.gif',
      news: '9 Leave Applications have been received.',
      link: '/'
    },
    {
      icon: this.storage + 'ico_pending.png',
      news: '8 Expense Applications have been received.',
      link: '/'
    },
    {
      icon: this.storage + 'ico_approved.gif',
      news: '20 Expense Applications have been approved by HR manager.',
      link: '/'
    },
    {
      icon: this.storage + 'ico_rejected.gif',
      news: '2 Expense Applications have been disapproved by HR manager.',
      link: '/'
    },
    {
      icon: this.storage + 'ico_approved.gif',
      news: '1 Travel Application has been approved by HR manager.',
      link: '/'
    },
    {
      icon: this.storage + 'ico_pending.png',
      news: '3  Job Description have been completed.',
      link: '/'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
