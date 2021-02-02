import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: "app-comment-box",
  templateUrl: "./comment-box.component.html",
  styleUrls: ["./comment-box.component.css"]
})
export class CommentBoxComponent implements OnInit {
  formComments: FormGroup;
  @Input() mode: string;
  @Input() headertext: string;
  @Input() showBtnCancel: boolean;
  @Output() submitForm = new EventEmitter();

  @Output() add = new EventEmitter<string>();
  value: string;
  constructor() {}
  ngOnInit(): void {
    this.formComments = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }
  sendComment(): void {
    this.submitForm.emit(this.formComments.value.comment);
    this.formComments.reset();
  }
}
