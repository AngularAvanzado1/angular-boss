import { GreetingsService } from '@a-boss/data';
import { Greetings } from '@a-boss/domain';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-ui-greetings',
  template: `
    <h1>
      <a [routerLink]="['/']">{{ theGreeting.message }}</a>
    </h1>
  `,
  styles: []
})
export class GreetingsComponent implements OnInit {
  public theGreeting: Greetings = { message: 'Hello world' };

  constructor(
    private greetingsService: GreetingsService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.greetingsService.getGrettings$().subscribe(this.appendApiMessage);
  }
  private appendApiMessage = (apiGreetings: Greetings) => {
    this.theGreeting.message += ' and ' + apiGreetings.message;
    this.cdr.detectChanges();
  };
}
