import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'ash-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  /**
  * Lower value
  */
  @Input() min = 100;
  /**
  * Maximum value
  */
  @Input() max = 200;
  /**
  * Function for parse labels handles.
  * This function will have two parameters. The value of the function and an index corresponding to the handler
  */
  @Input() labelFunction: any;
  /**
  * @ignore
  */
  _values: Array<number>;
  /**
  * Array of values. The length of the array corresponds to the number of handlers
  */
  @Input() get values() {
    return this._values;
  }
  /**
  * @ignore
  */
  set values(values) {
    this._values = values;
    this.init();
  }
  currentHandleIndex: number = null;
  handlesValues = [];
  handlesZindex = [];
  labelAlignClass = [];

  // @ViewChild('slider') slider;
  @ViewChild('handleContainer') handleContainer;
  @ViewChild('connect') connect;

  /**
  * Fuction will be fired when value changes
  */
  @Output('valueChange') valueChange = new EventEmitter<Array<number>>();

  private _drag = this.drag.bind(this);
  private _dragEnd = this.dragEnd.bind(this);


  constructor() { }

  ngOnInit() {
    if (!this.values) {
      this._values = [this.min, this.max];
      this.init();
    }
  }

  dragStart(e) {
    this.currentHandleIndex = parseInt(e.currentTarget.getAttribute('index'), 10);
    window.addEventListener('mousemove', this._drag);
    window.addEventListener('mouseup', this._dragEnd);
  }

  dragEnd() {
    this.calculateHandlesZindex(this.currentHandleIndex);
    this.currentHandleIndex = null;
    window.removeEventListener('mousemove', this._drag);
    window.removeEventListener('mouseup', this._dragEnd);
    this.valueChange.emit(this._values);
  }

  drag(e) {
    const offsetLeft = this.handleContainer.nativeElement.getBoundingClientRect().left + 7, // Seven is the width of handle,
      totalWidth = this.handleContainer.nativeElement.offsetWidth;

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
    this.labelAlignClass[this.currentHandleIndex] = this.calculateLabelAlignClass(this.currentHandleIndex);
  }

  private init() {
    this.calculateHandlesValue();
    this.resizeConnect();
    this.calculateHandlesZindex();
    setTimeout(() => {
      for (let i = 0; i < this.values.length; i++) {
        this.labelAlignClass[i] = this.calculateLabelAlignClass(i);
      }
    }, 100);
  }

  private calculateHandlesValue() {
    this.handlesValues = [];
    for (const v of this._values) {
      this.handlesValues.push(
        (((v - this.min) * 100) / (this.max - this.min))
      );
    }
  }

  private calculateHandlesZindex(index: number = null) {
    this.handlesZindex = [];
    const initZindex = 2;
    for (let i = 0; i < this.values.length; i++) {
      this.handlesZindex[i] = i + initZindex;
    }
    if (index !== null) {
      this.handlesZindex[index] = this.handlesZindex.length + initZindex;
    }
  }

  private resizeConnect() {
    if (this.values.length > 1) {
      this.connect.nativeElement.style.width = `${this.handlesValues[this.handlesValues.length - 1] - this.handlesValues[0]}%`;
      this.connect.nativeElement.style.margin = `0 0 0 ${this.handlesValues[0]}%`;
    } else {
      this.connect.nativeElement.style.width = `${this.handlesValues[this.handlesValues.length - 1]}%`;
    }
  }

  private parse(value, index) {
    if (this.labelFunction) {
      return this.labelFunction(value, index);
    }
    return value;
  }

  private calculateLabelAlignClass(index) {
    const handle = this.handleContainer.nativeElement.querySelector(`div[index="${index}"]`);
    if (handle) {
      const label = handle.querySelector('label');
      if (label && label.textContent !== '') {
        if (label.clientWidth + handle.offsetLeft > this.handleContainer.nativeElement.clientWidth) {
          return 'left';
        } else {
          return 'center';
        }
      }
    }
  }
}
