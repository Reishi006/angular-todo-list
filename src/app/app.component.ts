import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
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

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    const storedList = localStorage?.getItem('list');
    if (storedList) {
      this.list = JSON.parse(storedList);
    }
  }

  clearInput(input: HTMLInputElement) {
    input.value = '';
  }

  addToList(input: HTMLInputElement) {
    if (input.value === '' || undefined || null) return;
    this.list.push(input.value);
    localStorage.setItem('list', JSON.stringify(this.list));
    this.clearInput(input);
  }

  addToListEnter(e: KeyboardEvent, input: HTMLInputElement) {
    e.preventDefault();

    if (input.value === '' || undefined || null) return;

    if (e.key === 'Enter') {
      this.list.push(input.value);
      localStorage.setItem('list', JSON.stringify(this.list));
      this.clearInput(input);
    }
  }

  removeTodoElement(index: number) {
    if (index + 1 <= this.list.length) {
      this.list.splice(index, 1);
      localStorage.setItem('list', JSON.stringify(this.list));
    }
  }
}
