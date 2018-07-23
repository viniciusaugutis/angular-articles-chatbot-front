import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/model';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit {

  public loading: boolean;
  public conversation: Array<Message> = new Array<Message>();
  public message: Message;

  constructor() { }

  ngOnInit() {
    this.message = new Message();
    this.message.text = 'Oi meu nome é Chatbot';
    this.message.isChatbot = true;
    this.message.sendAt = new Date();
    this.conversation.push(this.message);
  }

}
