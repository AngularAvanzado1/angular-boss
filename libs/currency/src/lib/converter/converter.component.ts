import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'angular-boss-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  @Input() factor = 1.1;
  @Input() amount = 0;
  @Output() converted = new EventEmitter<number>();
  convertedAmount = 0;
  constructor() {}

  ngOnInit() {
    this.convert();
  }

  convert() {
    this.convertedAmount = this.amount * this.factor;
    this.converted.next(this.convertedAmount);
  }
}
