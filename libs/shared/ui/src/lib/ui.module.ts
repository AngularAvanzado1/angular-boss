import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingsComponent } from './greetings/greetings.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GreetingsComponent],
  exports: [GreetingsComponent]
})
export class UiModule {}
