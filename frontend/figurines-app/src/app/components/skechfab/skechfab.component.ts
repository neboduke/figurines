import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-skechfab',
  templateUrl: './skechfab.component.html',
  styleUrls: ['./skechfab.component.css']
})
export class SkechfabComponent implements OnInit {
  @Input() title:string = "";
  @Input() skechfaburl:string = "";
  
  url: SafeResourceUrl | undefined;

  constructor(public sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.skechfaburl);
  }

}
