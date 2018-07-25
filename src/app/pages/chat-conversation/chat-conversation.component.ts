import { ChatbotConversationScript, ChatConversationModel } from './../../shared/chatbot-conversation';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Message, UserApp } from '../../model/model';
import { IOption } from '../../../../node_modules/ng-select';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss']
})
export class ChatConversationComponent implements OnInit, AfterViewChecked {

  public loading: boolean;
  public conversation: Array<Message> = new Array<Message>();
  public userApp: UserApp = new UserApp();
  public message: Message;
  public messageAux: Message;
  public textUser: string;
  public chatbotScriptConversation: ChatConversationModel[];
  public indexScript: number;

  public categoryArticleOptions: Array<IOption> = [];
  public categoryArticleSelected: any;

  @ViewChild('scrollChat') private myScrollChat: ElementRef;

  constructor(public chatbotConversationScript: ChatbotConversationScript) { }

  ngOnInit() {
    this.indexScript = 0;
    this.chatbotScriptConversation = this.chatbotConversationScript.getAll();
    this.message = this.factoryMessage(this.chatbotScriptConversation[this.indexScript].text, true, this.chatbotScriptConversation[this.indexScript].typeMessage);
    this.conversation.push(this.message);
    this.verifyScriptChatbot();
    this.scrollToBottom();

    this.categoryArticleOptions = [
      {label: 'Arquitetura', value: '1'},
      {label: 'Sustentabilidade', value: '2'},
      {label: 'Paisagismo', value: '3'},
      {label: 'Decoração', value: '4'}
    ];
  }

  public sendMessage(text): void {
    if (this.loading) {
      return;
    }
    this.message = this.factoryMessage(this.textUser, false);
    this.conversation.push(this.message);

    if (this.chatbotScriptConversation[this.indexScript - 1] && this.chatbotScriptConversation[this.indexScript - 1].model) {
      if (this.chatbotScriptConversation[this.indexScript - 1].model === 'name') {
        this.userApp.name = this.textUser;
      } else if (this.chatbotScriptConversation[this.indexScript - 1].model === 'email') {
        this.userApp.email = this.textUser;
      }
    }

    this.textUser = '';
    this.loading = true;
    setTimeout(() => {
      if (this.chatbotScriptConversation[this.indexScript]) {
        this.message = this.factoryMessage(this.chatbotScriptConversation[this.indexScript].text, true, this.chatbotScriptConversation[this.indexScript].typeMessage);
        this.conversation.push(this.message);
        this.loading = false;
        this.verifyScriptChatbot();
      } else {
        console.log(this.userApp);
        console.log('FIMMM');
      }
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

  public factoryMessage(text: string, isChatbot: boolean, typeMessage?): Message {
    this.messageAux = new Message();
    this.messageAux.text = text;
    this.messageAux.isChatbot = isChatbot;
    this.messageAux.typeMessage = typeMessage ? typeMessage : 'text';
    this.messageAux.sendAt = new Date();
    return this.messageAux;
  }

  public verifyScriptChatbot(): void {
    if (this.chatbotScriptConversation[this.indexScript].nextNow) {
      this.indexScript++;
      this.loading = true;
      setTimeout(() => {
        this.message = this.factoryMessage(this.chatbotScriptConversation[this.indexScript].text, true);
        this.conversation.push(this.message);
        this.loading = false;
        this.verifyScriptChatbot();
      }, 3000);
    } else {
      this.indexScript++;
    }
  }

  public messageChatbotAfterSelect(): void {
    this.loading = true;
    setTimeout(() => {
      this.message = this.factoryMessage(this.chatbotScriptConversation[this.indexScript].text, true);
      this.conversation.push(this.message);
      this.loading = false;
      this.verifyScriptChatbot();
    }, 3000);
  }

}
