import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public storage: Storage) { }

  public async generateKey(): Promise<string>{
    let key = `todo${ parseInt(`${Math.random() * 100}`)}`;
    let ret = await this.storage.get(key);

    while(ret){
      key = `todo${ parseInt(`${Math.random() * 100}`)}`;
      ret = await this.storage.get(key);
    }
    return key;
  }
  public async read(): Promise<{todos:Todo[],keys:string[]}>{

    let todos: Array<Todo> = [];
    let keys: Array<string> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith("todo")){
          todos.push(v);
          keys.push(key);
      }
    });

    return {todos, keys};
  }

  public async create(key: string , todo: Todo){
    console.log("Creating todo: ", todo);
    return await this.storage.set(key, todo);
  }

  public async update(todo: Todo){
    return await this.storage.set(todo.title, todo);
  }

  public async delete(key: string){
    return await this.storage.remove(key);
  }
}
