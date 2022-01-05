import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
    constructor() {
    }
    
    ngOnInit() {
     
    }

}
