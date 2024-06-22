import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  list:string[] = [];

  addToList(input: string) {
    console.log(input);
    this.list.push(input);
  }

  addToListEnter(e: KeyboardEvent, input: string): void {
    e.preventDefault();
    
    if (e.key === 'Enter') {
      this.list.push(input);
    }
  }
}
