import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import * as TinyDatePicker from 'tiny-date-picker';
import { DateRangePicker } from 'tiny-date-picker/dist/date-range-picker';

@Component({
  selector: 'ash-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, AfterViewInit {

  /**
  * Two posibles modes: <br>
  * - classic: normal date picker
  * - range: range date picker
  */
  @Input() mode = 'classic';
  /**
  * Weekdays. Useful for translations
  */
  @Input() days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  /**
  * Month days. Useful for translations
  */
  @Input() months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  /**
  * To format each date
  */
  @Input() formatFunction = this.formatDate;
  /**
  * @ignore
  */
  _value: any;
  /**
  * For clasic mode value is a type date.
  * For rage mode value is a json like { start: < date >, end: < date >}
  }
  */
  @Input() get value() {
    return this._value;
  }
  /**
  * @ignore
  */
  set value(date) {
    this._value = date;
  }
  /**
  * Fuction will be fired when value changes
  */
  @Output('valueChange') valueChange = new EventEmitter<any>();
  @ViewChild('datepicker') datepicker;
  @ViewChild('rangeContainer') rangeContainer;

  showDataRangePicker = false;
  preventHideRangeDataPicker = false;
  previousTimeout;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let datePicker;
    const _this = this,
    options = {
      mode: 'dp-below',
      lang: {
        days: this.days,
        months: this.months
      },
      format(date) {
        return _this.formatFunction(date);
      },
      // hilightedDate: this.value
    };
    if (this.mode === 'classic') {
      datePicker = TinyDatePicker(this.datepicker.nativeElement, options).on({
        select: (_, dp) => {
          _this.value = dp.state.selectedDate;
          _this.valueChange.emit(_this._value);
        }
      });

    } else if (this.mode === 'range') {
      datePicker = DateRangePicker(this.datepicker.nativeElement, {
        startOpts: options
      }).on({
        statechange: (_, dp) => {
          _this.value = dp.state;
          _this.valueChange.emit(_this._value);
          if (_this._value.start && _this._value.end) {
            setTimeout(() => {
              _this.preventHideRangeDataPicker = false;
              _this.hideRangeDataPicker();
            }, 100);
          }
        }
      });
      if (this.value) {
        datePicker.setState({
          start: this.value.start,
          end: this.value.end,
        });
      }
      this.calculateDateRangePickerYPosition();
    }
  }

  private formatDate(date) {
    if (!date) {
      return '';
    }
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate(),
      month = this.months[date.getMonth()].substring(0, 3).toLocaleLowerCase();
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private formatRange() {
    if (!this._value) {
      return '';
    }
    let result = this.formatDate(this._value.start);
    if (this._value.end) {
      result += ` – ${this.formatDate(this.value.end)}`;
    }
    return result;
  }

  private calculateDateRangePickerYPosition() {
    const cal = this.datepicker.nativeElement,
    scrollTop = window.pageYOffset,
    marginToInputs = this.rangeContainer.nativeElement.getBoundingClientRect().height + 8,
    inputTop = scrollTop + this.rangeContainer.nativeElement.getBoundingClientRect().top,
    calHeight = cal.offsetHeight + marginToInputs,
    belowTop = inputTop + this.rangeContainer.nativeElement.getBoundingClientRect().height + 8,
    aboveTop = inputTop - calHeight - 8,
    isAbove = (aboveTop > 0 && belowTop + calHeight > scrollTop + window.innerHeight);
    if (isAbove) {
      cal.classList.add('above');
      cal.style.top = '-' + marginToInputs + 'px';
    } else {
      cal.style.top = marginToInputs + 'px';
    }
  }

  private openRangeDataPicker() {
    const elDatePicker  = this.rangeContainer.nativeElement.querySelector('.dp-day');
    const event = new MouseEvent('mouseover', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    elDatePicker.dispatchEvent(event);
    this.preventHideRangeDataPicker = true;
    this.showDataRangePicker = true;
  }

  private hideRangeDataPicker() {
    if (!this.preventHideRangeDataPicker) {
      this.showDataRangePicker = false;
    }
  }

}
