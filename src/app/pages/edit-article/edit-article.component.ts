import { Article } from '../../model/model';
import { ArticleUtilsService } from '../../shared/article-utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  public editor_modules;
  public editorInstance: any;
  public cursorInEditor: any;
  public articleUtils: Article = new Article();
  public article: Article = new Article();

  constructor(public articleUtilsService: ArticleUtilsService) { }

  ngOnInit() {
    this.editor_modules = {
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: 1 }, { header: 2 }],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['link', 'image']
        ]
      }
    };

    this.articleUtilsService.currentArticleUtils.subscribe(currentArticleUtils => {
      if (currentArticleUtils) {
       this.articleUtils = JSON.parse(currentArticleUtils);
        setTimeout(() => {
          this.article.content = this.articleUtils.content;
        }, 1000);
      }
    });

    this.article.meta = this.article.meta || {};
  }

  public onEditorCreated(editorObj) {
    editorObj.focus();
    this.editorInstance = editorObj;
    this.cursorInEditor = this.editorInstance.getSelection();
  }

}

