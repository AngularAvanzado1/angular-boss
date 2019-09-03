import { Greetings } from '@a-boss/domain';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ab-ui-greetings',
  template: `
    <p>
      {{ theGreeting.message }}
    </p>
  `,
  styles: []
})
export class GreetingsComponent implements OnInit {
  public theGreeting: Greetings = { message: 'Hello world' };
  constructor() {}
  ngOnInit() {}
}
