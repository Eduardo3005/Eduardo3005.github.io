import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from '../services/firebase-logger.service';

@Component({
  selector: 'app-contacts',
  templateUrl: '../../assets/templates/contacts/index.html',
  styleUrls: ['../../assets/templates/contacts/style.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private readonly firebase: FirebaseProvider) {}

  ngOnInit(): void {
  }

}
