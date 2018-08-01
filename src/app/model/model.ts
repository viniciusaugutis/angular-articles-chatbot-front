export class Message {
  text: string;
  isChatbot: boolean;
  sendAt: Date;
  typeMessage: string;
  model: string;
}

export class UserApp {
  name: string;
  email: string;
}

export class QuestionCategory {
  id: string;
  name: string;
}

export class Question {
  id: string;
  name: string;
  questionCategoryId: string;
  questionKeywords: Array<QuestionKeyword>;
}

export class QuestionKeyword {
  id: string;
  name: string;
}
