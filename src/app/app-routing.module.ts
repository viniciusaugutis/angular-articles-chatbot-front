import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ChatbotConversationScript } from './shared/chatbot-conversation';
import { ChatConversationComponent } from './pages/chat-conversation/chat-conversation.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '../../node_modules/@angular/forms';
registerLocaleData(ptBr);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatConversationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule, FormsModule],
  declarations: [],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    ChatbotConversationScript
  ]
})
export class AppRoutingModule { }
