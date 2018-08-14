import { Article } from './../../model/model';
import { ArticleUtilsService } from './../../shared/article-utils.service';
import { Question } from '../../model/model';
import { QuestionService } from '../../api/question.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  public articleUtils: Article = new Article();

  constructor(public questionService: QuestionService,
    public route: ActivatedRoute,
    public router: Router,
    public articleUtilsService: ArticleUtilsService) {
  }

  ngOnInit() {

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    this.contentToEditor = '';

    this.route
      .queryParams
      .subscribe(params => {
        this.questionService.findAll({ articleCategoryId: params['categoryArticle'] }).subscribe(data => {
          this.questions = data.content;
        });
      });
  }

  public nextQuestion(answeredQuestion: boolean) {
    if (answeredQuestion && this.responseUserText) {
      this.contentToEditor = this.contentToEditor.concat('<h1>' + this.questions[this.indexQuestion].name +
        '</h1>' + '<p>' + this.responseUserText + '</p><br/>');
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
    this.articleUtils.content = this.contentToEditor;
    this.articleUtilsService.updateArticleUtils(this.articleUtils);
    this.router.navigate(['/chat-feedback']);
  }

}
