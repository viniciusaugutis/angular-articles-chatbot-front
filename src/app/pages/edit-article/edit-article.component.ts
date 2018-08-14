import { ArticleUtilsService } from './../../shared/article-utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  public content: string;
  public editor_modules;
  public editorInstance: any;
  public cursorInEditor: any;

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
       console.log(JSON.parse(currentArticleUtils));
      }
    });
  }

  public onEditorCreated(editorObj) {
    editorObj.focus();
    this.editorInstance = editorObj;
    this.cursorInEditor = this.editorInstance.getSelection();
  }

}

