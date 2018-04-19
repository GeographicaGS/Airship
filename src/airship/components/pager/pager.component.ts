import { Component, OnInit, Input, Output, ViewChild, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'ash-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  /**
  * Number of pages
  */
  @Input() total: number;
  /**
  * Current page
  */
  @Input() value = 1;
  /**
  * Fuction will be fired when value changes
  */
  @Output('valueChange') valueChange = new EventEmitter<any>();
  @ViewChild('inputNumber') inputNumber;
  @ViewChild('backButton') backButton;
  @ViewChild('nextButton') nextButton;

  @HostBinding('class.editMode') editMode = false;

  oldValue: any;

  constructor() { }

  ngOnInit() {
    this.value = parseInt(<any>this.value, 10);
    this.total = parseInt(<any>this.total, 10);
    this.valueChanged(false);
  }

  currentChange(e) {
    const value = parseInt(e.currentTarget.value, 10);
    if (value >= 1 && value <= this.total) {
      this.value = value;
    } else {
      if (value < 1) {
        this.value = 1;
      } else {
        this.value = this.total;
      }
    }
    this.valueChanged();
  }

  back() {
    if (this.value > 1) {
      this.value --;
    }
    this.valueChanged();
  }

  next() {
    if (this.value < this.total) {
      this.value ++;
    }
    this.valueChanged();
  }

  activeEditMode() {
    this.editMode = true;
    this.oldValue = this.value;
    this.value = null;
    setTimeout(() => {
      this.inputNumber.nativeElement.focus();
    }, 100);
  }

  desactivateEditMode() {
    if (this.value === null) {
      this.value = this.oldValue;
    }
    this.editMode = false;
  }

  private valueChanged(emit = true) {
    this.inputNumber.nativeElement.blur();
    this.backButton.nativeElement.classList.remove('disable');
    this.nextButton.nativeElement.classList.remove('disable');
    if (this.value === 1) {
      this.backButton.nativeElement.classList.add('disable');
    } else if (this.value === this.total) {
      this.nextButton.nativeElement.classList.add('disable');
    }
    if (emit) {
      this.valueChange.emit(this.value);
    }
    this.editMode = false;
  }

}
