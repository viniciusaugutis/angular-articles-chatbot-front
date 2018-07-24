import { Injectable } from '../../../node_modules/@angular/core';

export interface ChatConversationModel {
  text: string;
  model: string;
  nextNow: boolean;
}

const CHAT_CONVERSATION = [
  {
    text: 'Olá, sou a Mel e fico feliz em poder te ajudar a escrever um artigo ' +
    'que provavelmente irá ajudar e interessar a outras pessoas.',
    model: null,
    nextNow: true
  },
  {
    text: 'Para iniciarmos, preciso te conhecer um pouco mais…',
    model: null,
    nextNow: true
  },
  {
    text: 'Qual é o seu nome?',
    model: 'name',
    nextNow: false
  },
  {
    text: 'Qual é o seu email?',
    model: 'email',
    nextNow: false
  }

];

@Injectable()
export class ChatbotConversationScript {
  getAll(): ChatConversationModel[] {
    return CHAT_CONVERSATION;
  }
}
