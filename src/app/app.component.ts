import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';


export class ListElement {
  constructor (done: boolean, content: string, edit: boolean) {
    this.done = done;
    this.content = content;
    this.edit = edit;
  }

  done: boolean = false;
  content: string = '';
  edit: boolean = false;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  list:ListElement[] = [];

  editInputValue: string;

  toggleEditInput = false; //later to be deleted (probably)

  @ViewChild('todoList') todoList: ElementRef;
  @ViewChild('inputCheck') inputCheck: ElementRef;
  @ViewChild('elementValue') elementValue: ElementRef;
  //@ViewChild('editInput') editInput: ElementRef;
  @ViewChild('editButton') editButton: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    const localStorage = document.defaultView?.localStorage;

    const storedList = localStorage?.getItem('list');
    if (storedList) {
      this.list = JSON.parse(storedList);
    }

  }

  clearInput(input: HTMLInputElement) {
    input.value = '';
  }

  setDone(index: number) {
    this.list[index].done = !this.list[index].done;
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  addToList(input: HTMLInputElement) {
    if (input.value === '' || undefined || null) return;
    this.list.push(new ListElement(false, input.value, false));
    localStorage.setItem('list', JSON.stringify(this.list));
    this.clearInput(input);
  }

  addToListEnter(e: KeyboardEvent, input: HTMLInputElement) {
    e.preventDefault();

    if (input.value === '' || undefined || null) return;

    if (e.key === 'Enter') {
      this.list.push(new ListElement(false, input.value, false));
      localStorage.setItem('list', JSON.stringify(this.list));
      this.clearInput(input);
    }
  }

  editTodoElement(index: number) {
    if (index + 1 <= this.list.length) {
      this.toggleEditInput = !this.toggleEditInput;
      this.list[index].edit = !this.list[index].edit;

      //console.log(this.list);
    }
  }

  confirmEditTodoElement(e: KeyboardEvent | MouseEvent, index: number, value: string) {
    e.preventDefault();

    this.editInputValue = value;

    if (index + 1 <= this.list.length) {
      if (e instanceof KeyboardEvent && e.key === 'Enter') {
        //console.log('keyboard event');
        this.toggleEditInput = !this.toggleEditInput;
        this.list[index].edit = !this.list[index].edit;

        this.list.splice(index, 1, new ListElement(this.list[index].done, value, false));
        localStorage.setItem('list', JSON.stringify(this.list));
      } else if (e instanceof MouseEvent) {
        this.toggleEditInput = !this.toggleEditInput;
        this.list[index].edit = !this.list[index].edit;

        this.list.splice(index, 1, new ListElement(this.list[index].done, value, false));
        localStorage.setItem('list', JSON.stringify(this.list));
      }
    }
  }

  removeTodoElement(index: number) {
    if (index + 1 <= this.list.length) {
      this.list.splice(index, 1);
      localStorage.setItem('list', JSON.stringify(this.list));
    }
  }
}
