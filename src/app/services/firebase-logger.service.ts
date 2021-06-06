import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/analytics';

type FirebaseApp = firebase.app.App;
type FirebaseAnalytics = firebase.analytics.Analytics;

@Injectable()
export class FirebaseProvider  {
	private app: FirebaseApp;
  private analytics: FirebaseAnalytics;

  constructor() {
    this.app = firebase.initializeApp({
      apiKey: 'AIzaSyDxZpZwzuDh0OdSeoxFuJWhrhoGPLEVVfs',
      authDomain: 'pateo-lima.firebaseapp.com',
      projectId: 'pateo-lima',
      storageBucket: 'pateo-lima.appspot.com',
      messagingSenderId: '685594092082',
      appId: '1:685594092082:web:dd7a1a4d56393d04e8122b',
      measurementId: 'G-QWNLYWJBGC'
    });

    this.analytics = this.app.analytics();
  }

  logEvent(message: string, data?: { [key: string]: any }): void {
    !!data
      ? this.analytics.logEvent(message, data)
      : this.analytics.logEvent(message);
  }
}
