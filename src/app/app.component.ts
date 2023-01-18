import { Component } from '@angular/core';
import * as JSZip from 'jszip';
import { Person } from './personService/person';
import { PersonService } from './personService/person.Service';
import * as LZString from 'lz-string';

declare var require: any // HAbe keine bessere lösung gefunden um den Fehler TS2591 zu umgehen

const QRCode = require('qrcode');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FirealertBachmann_Frontend-app';
  dataSource: string = "";


  constructor(private personService: PersonService) {}
  
  ngOnInit(): void {
   this.createQrCode();
  }

  async createQrCode(): Promise<void> {
    var people = await this.personService.getPeople().toPromise();
    var peopleText = "";

   
    people?.forEach(p => {
      peopleText = peopleText + p.Name + "," + p.KeyNumber + ";"
    });

    var compressed = LZString.compress(peopleText);

    this.dataSource = await QRCode.toDataURL(compressed);
    
    console.log(this.dataSource);
  }
}


