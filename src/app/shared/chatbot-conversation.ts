import { Injectable } from '../../../node_modules/@angular/core';

export interface ChatConversationModel {
  text: string;
  model: string;
  nextNow: boolean;
  typeMessage: string;
}

const CHAT_CONVERSATION = [
  {
    text: (Math.random() * (100 - 1) + 1) > 50 ? 'Bom dia, sou a Mel e fico feliz em poder te ajudar a escrever um artigo '
    : 'Boa Noite, sou a Mel e fico feliz em poder te ajudar a escrever um artigo que provavelmente irá ajudar e interessar a outras pessoas.',
    model: null,
    nextNow: true,
    typeMessage: 'text'
  },
  {
    text: 'Para iniciarmos, preciso te conhecer um pouco mais…',
    model: null,
    nextNow: true,
    typeMessage: 'text'
  },
  {
    text: 'Qual é o seu nome?',
    model: 'name',
    nextNow: false,
    typeMessage: 'text'
  },
  {
    text: 'qual é o seu email?',
    model: 'email',
    nextNow: false,
    typeMessage: 'text'
  },
  {
    text: 'Escolha um tema para o seu artigo.',
    model: 'category',
    nextNow: false,
    typeMessage: 'select'
  },
  {
    text: 'A categoria X é bem pesquisada na internet, cerca de Y pessoas buscam sobre isso todos os meses.',
    model: 'category-result',
    nextNow: true,
    typeMessage: 'text'
  },
  {
    text: 'Vamos começar?',
    model: 'go-questions',
    nextNow: false,
    typeMessage: 'text-button'
  },

];

@Injectable()
export class ChatbotConversationScript {
  getAll(): ChatConversationModel[] {
    return CHAT_CONVERSATION;
  }
}
