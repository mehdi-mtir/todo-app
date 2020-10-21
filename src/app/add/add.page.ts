import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(
    private todoService : TodoService,
    private router : Router) { }

  async addTodo(f : NgForm){
    let key = await this.todoService.generateKey();
    let todo = {
      title: f.value.title,
      note: f.value.note,
      completed: false
    };
    await this.todoService.create(key,todo);
    this.router.navigate(["/home"]);
  }

  ngOnInit() {
  }

}
