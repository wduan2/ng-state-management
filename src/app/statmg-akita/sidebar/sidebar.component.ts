import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  metadata = {};
  selectedMetadataId = -1;

  constructor() {
  }

  ngOnInit() {
  }

  fetchMetadata(metadataId: number) {
    // if (metadataId) {
    //   this.metadata = this.mockMetadataSets.find((e) => e.id === metadataId);

    //   if (!this.metadata) {
    //     console.error(`Invalid metadataId: ${metadataId}`);
    //   } else {
    //     this.selectedMetadataId = metadataId;
    //     console.log(`Set selectedMetadataId to ${metadataId}`);
    //   }
    // } else {
    //   console.error('Missing metadataId!');
    // }
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
