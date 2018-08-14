import { ChatbotConversationScript, ChatConversationModel } from '../../shared/chatbot-conversation';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Message } from '../../model/model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-feedback',
  templateUrl: './chat-feedback.component.html',
  styleUrls: ['./chat-feedback.component.scss',
              '../chat-conversation/chat-conversation.component.scss']
})
export class ChatFeedbackComponent implements OnInit, AfterViewChecked {
  public loading: boolean;
  public loadingActionArticle: boolean;
  public conversation: Array<Message> = new Array<Message>();
  public message: Message;
  public messageAux: Message;
  public textUser: string;
  public chatbotScriptConversation: ChatConversationModel[];
  public indexScript: number;
  public questionFeedbackFromUser: string;

  @ViewChild('scrollChat') private myScrollChat: ElementRef;

  constructor(public chatbotConversationScript: ChatbotConversationScript,
              public router: Router) { }

  ngOnInit() {

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.indexScript = 0;
      this.chatbotScriptConversation = this.chatbotConversationScript.getFeedbackConversation();
      this.message = this.factoryMessage(this.chatbotScriptConversation[this.indexScript].text, true, this.chatbotScriptConversation[this.indexScript].typeMessage,
        this.chatbotScriptConversation[this.indexScript].model);
      this.conversation.push(this.message);
      this.verifyScriptChatbot();
      this.scrollToBottom();
    }, 2000);

  }

  public sendMessage(text): void {
    if (this.loading) {
      return;
    }
    this.message = this.factoryMessage(this.textUser, false);
    this.conversation.push(this.message);

    if (this.chatbotScriptConversation[this.indexScript - 1] && this.chatbotScriptConversation[this.indexScript - 1].model) {
      if (this.chatbotScriptConversation[this.indexScript - 1].model === 'question-feedback') {
        this.questionFeedbackFromUser = this.textUser;
      }
    }

    this.textUser = '';
    this.loading = true;
    setTimeout(() => {
      const auxScript = this.chatbotScriptConversation[this.indexScript];
      if (auxScript) {
        this.message = this.factoryMessage(auxScript.text, true, auxScript.typeMessage, auxScript.model);
        this.conversation.push(this.message);
        this.loading = false;
        this.verifyScriptChatbot();
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

  public factoryMessage(text: string, isChatbot: boolean, typeMessage?, modelAffect?): Message {
    this.messageAux = new Message();
    this.messageAux.text = text;
    this.messageAux.isChatbot = isChatbot;
    this.messageAux.typeMessage = typeMessage ? typeMessage : 'text';
    this.messageAux.model = modelAffect ? modelAffect : null;
    this.messageAux.sendAt = new Date();
    return this.messageAux;
  }

  public verifyScriptChatbot(): void {
    if (this.chatbotScriptConversation[this.indexScript].nextNow) {
      this.indexScript++;
      this.loading = true;
      setTimeout(() => {
        this.message = this.factoryMessage(this.chatbotScriptConversation[this.indexScript].text, true, this.chatbotScriptConversation[this.indexScript].typeMessage,
          this.chatbotScriptConversation[this.indexScript].model);
        this.conversation.push(this.message);
        this.loading = false;
        this.verifyScriptChatbot();
        if (this.chatbotScriptConversation[this.indexScript - 1] && this.chatbotScriptConversation[this.indexScript - 1].model) {
          if (this.chatbotScriptConversation[this.indexScript - 1].model === 'go-article') {
            this.loadingActionArticle = true;
            setTimeout(() => {
              this.router.navigate(['/editor-artigo']);
            }, 3000);
          }
        }

      }, 2000);
    } else {
      this.indexScript++;
    }
  }

}
