import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  counters: any[] = [];
  totalCount: number = 0;

  addCounter() {
    this.counters.push({ count: 0 });
  }

  resetCounters() {
    this.counters = [];
  }

  increment(index: number) {
    this.counters[index].count++;
    this.calculateTotalCount();
  }

  decrement(index: number) {
    if (this.counters[index].count > 0) {
      this.counters[index].count--;
      this.calculateTotalCount();
    }
  }

  calculateTotalCount() {
    this.totalCount = this.counters.reduce((total, counter) => total + counter.count, 0);
  }

  deleteCounter(index: number) {
    this.counters.splice(index, 1);
    this.calculateTotalCount();
  }
}
