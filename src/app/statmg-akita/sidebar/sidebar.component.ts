import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  /** mock data */
  private mockMetadataSets = [
    {
      id: 1,
      name: 'FrontEnd',
      records: [
        { id: '4eaf77e2', name: 'Angular' },
        { id: 'c1870192', name: 'React' },
        { id: '96a9e567', name: 'ScalaJS' }
      ]
    },
    {
      id: 2,
      name: 'BackEnd',
      records: [
        { id: 'cf781e78', name: 'Spring' },
        { id: 'f5a866ef', name: 'NodeJS' },
        { id: '86ba9b6e', name: 'Django' }
      ]
    }
  ];

  private mockDataSets = {
    '4eaf77e2': { rate: '1/5' },
    'c1870192': { rate: '5/5' },
    '96a9e567': { rate: '0/5' },
    'cf781e78': { rate: '3/5' },
    'f5a866ef': { rate: '5/5' },
    '86ba9b6e': { rate: '0/5' }
  };
  /** mock data */

  metadataOptions = [
    { name: 'FrontEnd', id: 1 },
    { name: 'BackEnd', id: 2}
  ];

  metadata = {};
  selectedMetadataId = -1;

  constructor() {
  }

  ngOnInit() {
  }

  fetchMetadata(metadataId: number) {
    if (metadataId) {
      this.metadata = this.mockMetadataSets.find((e) => e.id === metadataId);

      if (!this.metadata) {
        console.error(`Invalid metadataId: ${metadataId}`);
      } else {
        this.selectedMetadataId = metadataId;
        console.log(`Set selectedMetadataId to ${metadataId}`);
      }
    } else {
      console.error('Missing metadataId!');
    }
  }

  isMetadataReady() {
    return !!this.selectedMetadataId && !!this.metadata;
  }

  isMetadataSelected(optionId: number) {
    return this.selectedMetadataId === optionId;
  }

  fetchRecord(recordId: string) {

  }

  toggleRecord(recordId: string) {

  }
}
