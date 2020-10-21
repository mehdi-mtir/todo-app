import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public todos: Array<Todo> = [];
  public keys: Array<string> = [];
  constructor(
    public todoService: TodoService,
    public router : Router
    ) {}



  getIcon(todo){
    if(todo.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }
  /* public async createTodo(){
    let key = await this.todoService.generateKey();
    let todo = {
      title: `${key}`,
      note: "A new todo",
      completed: false
    };
    await this.todoService.create(key,todo);
    this.todos = await this.todoService.read();
  } */

  public createTodo(){
    this.router.navigate(["/add"]);
  }

  async deleteTodo(indice: number){
    if(confirm("Etes vous sure de vouloir supprimer la tache")){
    let key = this.keys[indice];
    this.todoService.delete(key);

    this.todos = await (await this.todoService.read()).todos;
    this.keys =  await (await this.todoService.read()).keys;
   }

  }

  async ngOnInit(){
    this.todos = await (await this.todoService.read()).todos;
    this.keys =  await (await this.todoService.read()).keys;
  }

  async ionViewWillEnter(){
    this.todos = await (await this.todoService.read()).todos;
    this.keys =  await (await this.todoService.read()).keys;
  }

}
