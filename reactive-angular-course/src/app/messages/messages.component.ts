import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import {inject} from "@angular/core";
import {MessagesService} from "../services/messages.service";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  errors$: Observable<string[]>;

  messagesService = inject(MessagesService);

  constructor() {
    console.log('messages component');
  }

  ngOnInit() {
    this.messagesService.errors$ = this.messagesService.errors$.pipe(
      tap(() => this.showMessages = true)
    );
  }


  onClose() {
    this.showMessages = false;
  }

}
