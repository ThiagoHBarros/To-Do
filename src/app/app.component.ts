import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {  
  public todos: Todo[] = [];
  public title: string = 'Lista de Tarefas';
  public mode = 'list';
  public form: FormGroup;

  constructor(
    private _fb: FormBuilder,    
  ) 
  {  
    this.form = this._fb.group({
      tarefa: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      
      ])]
    })

    this.load();
  }

  add() {
    const title = this.form.controls['tarefa'].value;
    const id = this.todos.length + 1 * 3;    

    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
    this.changeMode('list');
  }


  changeMode(mode: string) {
    this.mode = mode;
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if(index !== -1) {
      this.todos.splice(index, 1);
    }    

    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;  
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {    
    const data = localStorage.getItem('todos');
    this.todos = data != null ? JSON.parse(data) : [];
  }

}
