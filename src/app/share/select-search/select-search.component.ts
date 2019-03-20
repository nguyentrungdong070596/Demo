import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  protected banks: any[] = [
    { name: 'Bank A (Switzerland)', id: 'A' },
    { name: 'Bank B (Switzerland)', id: 'B' },
    { name: 'Bank C (France)', id: 'C' },
    { name: 'Bank D (France)', id: 'D' },
    { name: 'Bank E (France)', id: 'E' },
    { name: 'Bank F (Italy)', id: 'F' },
    { name: 'Bank G (Italy)', id: 'G' },
    { name: 'Bank H (Italy)', id: 'H' },
    { name: 'Bank I (Italy)', id: 'I' },
    { name: 'Bank J (Italy)', id: 'J' },
    { name: 'Bank Kolombia (United States of America)', id: 'K' },
    { name: 'Bank L (Germany)', id: 'L' },
    { name: 'Bank M (Germany)', id: 'M' },
    { name: 'Bank N (Germany)', id: 'N' },
    { name: 'Bank O (Germany)', id: 'O' },
    { name: 'Bank P (Germany)', id: 'P' },
    { name: 'Bank Q (Germany)', id: 'Q' },
    { name: 'Bank R (Germany)', id: 'R' }
  ];
  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();


  constructor() { }

  ngOnInit() {
    this.bankCtrl.setValue(this.banks[10]);
    this.filteredBanks.next(this.banks.slice());
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
