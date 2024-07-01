import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [JsonPipe,ReactiveFormsModule,NgFor,NgIf],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  @ViewChild('displayOptions', { static: false }) displayOptionsElement!: ElementRef;
  @ViewChild('displayText', { static: false }) displayTextElement!: ElementRef;

  ngAfterViewInit() {
    if (this.displayOptionsElement) {
      console.log(this.displayOptionsElement.nativeElement); 
      this.displayOptionsElement.nativeElement.style.display='none';
    }
  }
  questionsForm=new FormGroup({
    questions:new FormArray([])
  })
 
  get questions(){
    return this.questionsForm.get('questions') as FormArray
  }
  addQuestion(){
    console.log('hello')
    this.displayTextElement.nativeElement.style.display='none';
    this.displayOptionsElement.nativeElement.style.display='block';
  }
  removeQuestion(questionIndex:number){
    this.questions.removeAt(questionIndex)
  }
  moveUpQuestion(questionIndex:number){
    const question=this.questions.at(questionIndex);
    console.log(question.value);
    this.questions.removeAt(questionIndex);
    this.questions.insert(questionIndex-1,question);
  }
  moveDownQuestion(questionIndex:number){
    const question=this.questions.at(questionIndex);
    console.log(question.value);
    this.questions.removeAt(questionIndex);
    this.questions.insert(questionIndex+1,question);
  }
  onOptionSelected(event:any){
      const type=event.target.value;
      if(type==='Text'){
        console.log('in text')
        this.questions.push(this.createTextQuestion())
      }
      else if(type==='Choice'){
        console.log('in choice')
        this.questions.push(this.createChoiceQuestion());
      }
      else{
        this.questions.push(this.createQuestion(type));
      }
      console.log(event.target.value);
      this.displayTextElement.nativeElement.style.display='block';
      this.displayOptionsElement.nativeElement.style.display='none';
      event.target.value='Select Your Choice'
  }
  createQuestion(type:string):FormGroup{
    return new FormGroup({
      question:new FormControl(''),
      answer:new FormControl({ value: 'my answer', disabled: true }),
      type:new FormControl(type),
      isRequired:new FormControl(false),
    })
  }
  createChoiceQuestion(){
    return new FormGroup({
      question:new FormControl(''),
      type:new FormControl('choice'),
      options:new FormArray([this.createOption(0),this.createOption(1)]),
      isRequired:new FormControl(false),
      isMultipleChoice:new FormControl(false)
    })
  }
  options(questionIndex:number){
    return this.questions.at(questionIndex).get('options') as FormArray
  }
  createOption(length:number){
    return new FormGroup({
      box:new FormControl(false),
      label:new FormControl(''),
      
    })
  }
  addOption(questionIndex:number){
    const options=this.options(questionIndex)
    options.push(this.createOption(options.length))
    // this.options(questionIndex).push(this.createOption())
    this.options(questionIndex).controls.forEach((control, index) => {
      console.log("added option");
      if (index !== this.options(questionIndex).length - 1) {
        console.log("false control")
        control.get('box')?.setValue(false);
      }
    });
  }
  removeOption(questionIndex:number,optionIndex:number){
    this.options(questionIndex).removeAt(optionIndex)

  }
  createTextQuestion(): FormGroup{
    return new FormGroup({
      question:new FormControl(''),
      type:new FormControl('text'),
      isLong:new FormControl(false),
      isRequired:new FormControl(false)
    })
  }
}


