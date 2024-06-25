import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormArray, FormGroup } from '@angular/forms';
import { NgFor,NgIf } from '@angular/common';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-temp',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor,JsonPipe,NgIf],
  templateUrl: './temp.component.html',
  styleUrl: './temp.component.scss'
})
export class TempComponent {
  inputTypes = ['text','radio', 'checkbox', 'select', 'textarea'];
  questionsForm=new FormGroup({
    questions:new FormArray([this.createQuestion()])
  })
  
  createQuestion(){
    const myform:FormGroup= new FormGroup({
      question:new FormControl('',[Validators.required]),
      optionType:new FormControl('',[Validators.required]),
      options:new FormArray([])
    });
 
    myform.controls['optionType'].valueChanges.subscribe(value => {
      const temp=myform.controls['options'] as FormArray;
      if (value === 'checkbox' || value==='radio'  || value==='select') {

        console.log("hello if");
        console.log(temp.length)
        // if(temp.length==0)
          temp.push(this.createOption());
      } 
      else{
        console.log("hello else");
        console.log(temp.value)
        // temp.clear();
      }
    });
    return myform;
  }

 
  get questions(){
    return this.questionsForm.get('questions') as FormArray
  }
 
  options(index:number):FormArray{
    return this.questions.at(index).get('options') as FormArray
  }
  createOption(){
    return new FormControl('',[Validators.required])
  }
  addQuestion(){
    this.questions.push(this.createQuestion())
  }
  removeQuestion(questionIndex:number){
    this.questions.removeAt(questionIndex)
  }

  addOption(index:number){
    this.options(index).push(this.createOption())
  }
  removeOption(questionIndex:number,optionIndex:number){
    this.options(questionIndex).removeAt(optionIndex)
  }

  getQuestionsControls(): FormArray{
    return this.questionsForm.get('questions') as FormArray;
  }

  submitForm(){
    console.log("form submitted")
    console.log(this.questionsForm.value)
  }


  resultForm=new FormGroup({
    
  })
  

}
