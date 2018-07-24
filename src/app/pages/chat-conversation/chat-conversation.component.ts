import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Message } from '../../model/model';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit, AfterViewChecked {

  public loading: boolean;
  public conversation: Array<Message> = new Array<Message>();
  public message: Message;
  public textUser: string;

  @ViewChild('scrollChat') private myScrollChat: ElementRef;

  constructor() { }

  ngOnInit() {
    this.message = new Message();
    this.message.text = 'Oi meu nome é Chatbot';
    this.message.isChatbot = true;
    this.message.sendAt = new Date();
    this.conversation.push(this.message);
    this.scrollToBottom();
  }

  public sendMessage(text): void {
    if (this.loading) {
      return;
    }
    this.message = new Message();
    this.message.text = this.textUser;
    this.message.isChatbot = false;
    this.message.sendAt = new Date();
    this.conversation.push(this.message);
    this.textUser = '';

    this.loading = true;
    setTimeout(() => {
      this.message = new Message();
      this.message.text = 'Tudo bem?';
      this.message.isChatbot = true;
      this.message.sendAt = new Date();
      this.conversation.push(this.message);
      this.loading = false;
      window.scroll(0, 0);
    }, 2000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  /**
   * @method scrollToBottom
   * @description Execute to change the scroll of chat to bottom
   */
  scrollToBottom(): void {
    try {
      this.myScrollChat.nativeElement.scrollTop = this.myScrollChat.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
