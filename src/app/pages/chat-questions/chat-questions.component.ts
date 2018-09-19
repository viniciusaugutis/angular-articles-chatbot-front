import { Topic } from './../../model/model';
import { TopicService } from './../../api/topic.service';
import { Article } from '../../model/model';
import { ArticleUtilsService } from '../../shared/article-utils.service';
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
  public loadingDescriptionTheme = true;
  public descriptionTheme = '';
  public topicsCategory: Array<Topic>;
  public openChatFeedback = false;

  constructor(public questionService: QuestionService,
    public route: ActivatedRoute,
    public router: Router,
    public articleUtilsService: ArticleUtilsService,
    public topicService: TopicService) {
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
        this.topicService.findAll({ articleCategoryId: params['categoryArticle'] }).subscribe(dataTopics => {
          this.topicsCategory = dataTopics.content;
          const topicSelect = Math.round((Math.random() * (dataTopics.totalElements - 1) + 1)).toString();
          this.questionService.findAll({ topicId: topicSelect }).subscribe(dataQuestions => {
            this.questions = dataQuestions.content;
            console.log(this.questions);
            this.descriptionTheme = this.questions[0].topic.description;
          });
        });
      });
  }

  public nextQuestion(answeredQuestion: boolean) {
    if (answeredQuestion && this.responseUserText) {
      this.contentToEditor = this.contentToEditor.concat('<h1>' + this.questions[this.indexQuestion].name +
        '</h1>' + '<p>' + this.responseUserText + '</p><br/>');
      this.contQuestionAnswered++;
      this.enableQuestion = false;
    }
    this.loading = true;
    this.indexQuestion++;
    this.responseUserText = '';
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  public finishArticle() {
    this.articleUtils.articleCategory = this.questions[0].topic.articleCategory;
    this.articleUtils.content = this.contentToEditor;
    this.articleUtils.meta = this.articleUtils.meta || {};
    this.articleUtils.meta.keywords = this.questions[0].topic.topicKeywords;
    this.articleUtilsService.updateArticleUtils(this.articleUtils);
    this.openChatFeedback = true;
  }

  public goQuestions() {
    this.loadingDescriptionTheme = false;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  public nextTopicQuestion() {
    const topicSelect = Math.round((Math.random() * (this.topicsCategory.length - 1) + 1)).toString();
    this.questionService.findAll({ topicId: topicSelect }).subscribe(dataQuestions => {
      this.questions = dataQuestions.content;
      if (this.questions[0].topic.description === this.descriptionTheme) {
        this.nextTopicQuestion();
      } else {
        this.descriptionTheme = this.questions[0].topic.description;
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    });
  }

}
