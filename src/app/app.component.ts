import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { TempComponent } from './temp/temp.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CreateFormComponent,TempComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'assignment2';
}
