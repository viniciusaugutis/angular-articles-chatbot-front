import { Injectable } from '../../../node_modules/@angular/core';

export interface ChatConversationModel {
  text: string;
  model: string;
  nextNow: boolean;
  typeMessage: string;
}

const CHAT_CONVERSATION = [
  {
    text: 'Olá, sou a Mel e fico feliz em poder te ajudar a escrever um artigo que provavelmente irá ajudar e interessar a outras pessoas.',
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

const CHAT_CONVERSATION_FEEDBACK = [
  {
    text: 'Parabéns! A edição do seu artigo está pronta. Já te envio para lá!',
    model: null,
    nextNow: true,
    typeMessage: 'text'
  },
  {
    text: 'Você sentiu falta de alguma pergunta sobre o tema, que não te foi feita? Se sim, escreva no chat agora para nos ajudar a aprimorar sempre mais.' +
    ' Se não, clique no botão para continuar.',
    model: 'question-feedback',
    nextNow: false,
    typeMessage: 'text-button'
  },
  {
    text: 'Agora você pode adicionar imagens ou editar o seu texto no layout de edição.',
    model: null,
    nextNow: true,
    typeMessage: 'text'
  },
  {
    text: 'Ahhh… Quero te lembrar que se você adicionar imagens no seu artigo, suas chances de atrair mais clientes aumentam.',
    model: null,
    nextNow: true,
    typeMessage: 'text'
  },
  {
    text: '  Estou te enviando para lá… Foi um prazer e espero te ver mais vezes aqui! Byeeeee',
    model: 'go-article',
    nextNow: false,
    typeMessage: 'text-button'
  },
];

@Injectable()
export class ChatbotConversationScript {
  getScriptConversation(): ChatConversationModel[] {
    return CHAT_CONVERSATION;
  }
  getFeedbackConversation(): ChatConversationModel[] {
    return CHAT_CONVERSATION_FEEDBACK;
  }
}
