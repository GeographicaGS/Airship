import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'ash-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  @Input() min = 100;
  @Input() max = 200;
  _values = [100, 200];
  @Input() get values() {
    return this._values;
  }
  set values(values) {
    this._values = values;
    this.handlesValues = [];
    for (const v of this._values) {
      this.handlesValues.push(
        (((v - this.min) * 100) / (this.max - this.min))
      );
    }
    this.resizeConnect();
  }
  currentHandleIndex: number = null;
  handlesValues = [];

  @ViewChild('slider') slider;
  @ViewChild('connect') connect;

  @Output('valueChange') valueChange = new EventEmitter<Array<number>>();

  private _drag = this.drag.bind(this);
  private _dragEnd = this.dragEnd.bind(this);


  constructor() { }

  ngOnInit() {
  }

  dragStart(e) {
    this.currentHandleIndex = parseInt(e.currentTarget.getAttribute('index'), 10);
    window.addEventListener('mousemove', this._drag);
    window.addEventListener('mouseup', this._dragEnd);
  }

  dragEnd() {
    this.currentHandleIndex = null;
    window.removeEventListener('mousemove', this._drag);
    window.removeEventListener('mouseup', this._dragEnd);
    this.valueChange.emit(this._values);
  }

  drag(e) {
    const offsetLeft = this.slider.nativeElement.offsetLeft,
      totalWidth = this.slider.nativeElement.offsetWidth;

    let value, percentage;

    if (e.clientX < offsetLeft) {
      percentage = 0;
      value = this.min;
      this.handlesValues[this.currentHandleIndex] = 0;
      this.values[this.currentHandleIndex] = this.min;

    } else if (e.clientX > (offsetLeft + totalWidth)) {
      percentage = 100;
      value = this.max;
      this.handlesValues[this.currentHandleIndex] = 100;
      this.values[this.currentHandleIndex] = this.max;
    } else {
      percentage = ((e.clientX - offsetLeft) * 100) / totalWidth;
      value = ((this.max - this.min) * (percentage / 100)) + this.min;
    }
    if (
      this.currentHandleIndex + 1 < this.values.length &&
      value >= this.values[this.currentHandleIndex  + 1]
    ) {
      this.handlesValues[this.currentHandleIndex] = this.handlesValues[this.currentHandleIndex + 1];
      this.values[this.currentHandleIndex] = this.values[this.currentHandleIndex + 1];
    } else if (
      this.currentHandleIndex - 1 >= 0 &&
      value <= this.values[this.currentHandleIndex  - 1]
    ) {
      this.handlesValues[this.currentHandleIndex] = this.handlesValues[this.currentHandleIndex - 1];
      this.values[this.currentHandleIndex] = this.values[this.currentHandleIndex - 1];
    } else {
      this.handlesValues[this.currentHandleIndex] = percentage;
      this.values[this.currentHandleIndex] = value.toString().split('.').length > 1 ? parseFloat(value.toFixed(2)) : value;
    }
    this.resizeConnect();
  }

  private resizeConnect() {
    if (this.values.length > 1) {
      this.connect.nativeElement.style.width = `${this.handlesValues[this.handlesValues.length - 1] - this.handlesValues[0]}%`;
      this.connect.nativeElement.style.margin = `0 0 0 ${this.handlesValues[0]}%`;
    } else {
      this.connect.nativeElement.style.width = `${this.handlesValues[this.handlesValues.length - 1]}%`;
    }
  }
}
