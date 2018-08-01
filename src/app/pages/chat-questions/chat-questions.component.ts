import { Question } from './../../model/model';
import { QuestionService } from './../../api/question.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-chat-questions',
  templateUrl: './chat-questions.component.html',
  styleUrls: ['./chat-questions.component.scss',
    '../chat-conversation/chat-conversation.component.scss']
})
export class ChatQuestionsComponent implements OnInit {

  public questions: Array<Question> = new Array<Question>();
  public indexQuestion = 0;
  public contQuestionAnswered = 0;
  public textLenght = 0;
  public enableQuestion = false;
  public loading;
  public contentToEditor: string;
  public responseUserText: string;

  constructor(public questionService: QuestionService,
    public route: ActivatedRoute) {
  }

  ngOnInit() {

    this.contentToEditor = '';

    this.route
      .queryParams
      .subscribe(params => {
        this.questionService.findAll({ questionCategoryId: params['categoryArticle'] }).subscribe(data => {
          this.questions = data.content;
        });
      });
  }

  public nextQuestion(answeredQuestion: boolean) {
    console.log('veio');
    if (answeredQuestion && this.responseUserText) {
      this.contentToEditor = this.contentToEditor.concat('<h2>' + this.questions[this.indexQuestion].name +
        '</h2>' + '<p>' + this.responseUserText + '</p><br/>');
      this.contQuestionAnswered++;
    }
    this.loading = true;
    this.indexQuestion++;
    this.responseUserText = '';
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  public finishArticle() {
    console.log(this.contentToEditor);
  }

}
