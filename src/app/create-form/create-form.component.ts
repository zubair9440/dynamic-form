import { Component, input } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormControl, FormArray } from '@angular/forms';
import { NgFor } from '@angular/common';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,JsonPipe],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {
  inputTypes = ['text','radio', 'checkbox', 'select', 'textarea'];
  questionForm = new FormGroup({
    questions:new FormArray([this.createQuestion()]),
   
  })
  newForm!: FormGroup;
  createQuestion(){
    return new FormGroup({
      question: new FormControl(''),
      inputType: new FormControl(''),
      options: new FormArray([this.createOption()])
    })
  }
  createOption(): any {
    return new FormGroup({
      option: new FormControl('')
    })
  }
  get questions(): FormArray{
    return this.questionForm.get('questions') as FormArray;

  }
  removeQuestion(index: number){
    this.questions.removeAt(index);
    // console.log(this.newForm);
  }
  addQuestion(){
    // this.questionForm.addControl('questions', this.createQuestion());

  }
  addNextQuestion(){
    this.questions.push(this.createQuestion());
  }
  get options(): FormArray{
    return this.questions.get('options') as FormArray;
  }
  addOption(i:any){
    const ques= this.questions.at(i).get('options') as FormArray;
    ques.push(i);
    // this.options.push(this.createOption());
  }
}

