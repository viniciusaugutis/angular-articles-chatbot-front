import { QuestionCategoryService } from './api/question-category.service';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { ChatConversationComponent } from './pages/chat-conversation/chat-conversation.component';
import { ChatQuestionsComponent } from './pages/chat-questions/chat-questions.component';
import { CoreModule } from './core/core.module';
import { ChatFeedbackComponent } from './pages/chat-feedback/chat-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatConversationComponent,
    ChatQuestionsComponent,
    ChatFeedbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [QuestionCategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
