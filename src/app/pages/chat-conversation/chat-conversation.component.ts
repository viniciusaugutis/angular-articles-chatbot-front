import { ChatbotConversationScript, ChatConversationModel } from '../../shared/chatbot-conversation';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Message, UserApp } from '../../model/model';
import { ArticleCategoryService } from '../../api/article-category.service';

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

  public categoryArticleOptions: any;
  public categoryArticleSelected: any;

  @ViewChild('scrollChat') private myScrollChat: ElementRef;

  constructor(public chatbotConversationScript: ChatbotConversationScript,
    public articleCategoryService: ArticleCategoryService) { }

  ngOnInit() {

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.indexScript = 0;
      this.chatbotScriptConversation = this.chatbotConversationScript.getScriptConversation();
      this.message = this.factoryMessage(this.chatbotScriptConversation[this.indexScript].text, true, this.chatbotScriptConversation[this.indexScript].typeMessage,
        this.chatbotScriptConversation[this.indexScript].model);
      this.conversation.push(this.message);
      this.verifyScriptChatbot();
      this.scrollToBottom();

      this.categoryArticleOptions = this.articleCategoryService.findAll().subscribe(data => {
        this.categoryArticleOptions = data.map(
          category => ({ label: category.name, value: category.id.toString() })
        );
      });
    }, 2000);

  }

  public sendMessage(text?): void {
    if (this.loading) {
      return;
    }
    this.message = this.factoryMessage(this.textUser, false);
    this.conversation.push(this.message);

    if (this.chatbotScriptConversation[this.indexScript - 1] && this.chatbotScriptConversation[this.indexScript - 1].model) {
      if (this.chatbotScriptConversation[this.indexScript - 1].model === 'name') {
        this.userApp.name = '';
        this.userApp.name = this.textUser;
      } else if (this.chatbotScriptConversation[this.indexScript - 1].model === 'email') {
        if (this.textUser === '1') { // validar email aqui
          this.loading = true;
          setTimeout(() => {
            this.message = this.factoryMessage('Desculpe, não entendi! Por favor, digite novamente seu e-mail', true);
            this.conversation.push(this.message);
            this.loading = false;
            this.textUser = '';
          }, 2000);
          return;
        }
        this.userApp.email = this.textUser;
      }
    }

    this.textUser = '';
    this.loading = true;
    setTimeout(() => {
      const auxScript = this.chatbotScriptConversation[this.indexScript];
      if (auxScript) {
        let auxText = '';
        switch (auxScript.model) {
          case 'email':
            auxText = `${this.userApp.name}, ${auxScript.text}`;
            break;
        }
        this.message = this.factoryMessage((auxText ? auxText : auxScript.text), true, auxScript.typeMessage, auxScript.model);
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
      }, 2000);
    } else {
      this.indexScript++;
    }
  }

  public messageChatbotAfterSelect(): void {
    this.loading = true;

    switch (this.chatbotScriptConversation[this.indexScript].model) {
      case 'category-result':
        this.categoryArticleOptions.forEach(element => {
          console.log(this.categoryArticleSelected);
          console.log(element.value);
          if (element.value === this.categoryArticleSelected) {
            this.chatbotScriptConversation[this.indexScript].text = this.chatbotScriptConversation[this.indexScript].text.replace('X', element.label);
          }
        });
        break;
    }
    setTimeout(() => {
      this.message = this.factoryMessage(this.chatbotScriptConversation[this.indexScript].text, true,
        this.chatbotScriptConversation[this.indexScript].typeMessage, this.chatbotScriptConversation[this.indexScript].model);
      this.conversation.push(this.message);
      this.loading = false;
      this.verifyScriptChatbot();
    }, 2000);
  }

}
