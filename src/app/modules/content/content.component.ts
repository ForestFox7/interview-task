import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)'}),
        animate(500, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0, transform: 'translateY(30px)'}))
      ]),
    ])
  ]
})
export class ContentComponent implements OnInit {
  title = 'To Do Liste';
  create = 'Neue Aufgabe erstellen';
  headline = 'Deine Aufgaben';
  placeholder = 'Was hast Du heute noch vor?';
  checkAll = 'Alles geschafft';
  itemsLeft = 'übrig';
  clearAll = 'Fertige entfernen';

  todos: Todo[];
  todoTitle: string;
  todoId: number;
  beforeEditCache: string;
  filter: string;

  constructor() { }

  ngOnInit() {
    this.filter = 'alle';
    this.beforeEditCache = '';
    this.todoId = 4;
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'Start useful things',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Build To Do App',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'Become enlightened',
        'completed': false,
        'editing': false,
      },
    ]
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.todoId,
      title: this.todoTitle,
      completed: false,
      editing: false
    })

    this.todoTitle = '';
    this.todoId++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }
  
  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }
  
  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }
  
  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  deleteCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTasks(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }

  todosFiltered(): Todo[] {
    switch(this.filter) {
      case 'alle': {
        return this.todos;
      }
      case 'aktiv': {
        return this.todos.filter(todo => !todo.completed);
      }
      case 'fertig': {
        return this.todos.filter(todo => todo.completed);
      }
    }
  }
}

