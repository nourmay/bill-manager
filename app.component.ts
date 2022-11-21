import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { firstInput, secondInput, thirdInput } from './bills-mock';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  firstInput;
  secondInput;
  thirdInput;
  totalfirstInput = 0;

  totalTaxefirstInput = 0;
  totalSecondInput = 0;
  totalTaxeSecondInput = 0;
  totalThirdInput = 0;
  totalTaxeThirdInput = 0;

  showBill = false;
  totalSum = 0;
  destroy$ = new Subject<boolean>();
  ngOnInit(): void {
    combineLatest([firstInput, secondInput, thirdInput])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([val1, val2, val3]) => {
        this.firstInput = val1;
        this.secondInput = val2;
        this.thirdInput = val3;
        this.totalTaxefirstInput = this.calculateTaxe(
          val1,
          this.totalTaxefirstInput
        );
        this.totalTaxeSecondInput = this.calculateTaxe(
          val2,
          this.totalTaxeSecondInput
        );
        this.totalTaxeThirdInput = this.calculateTaxe(
          val3,
          this.totalTaxeThirdInput
        );
        this.totalfirstInput = this.calculateTotal(val1, this.totalfirstInput);
        this.totalSecondInput = this.calculateTotal(
          val2,
          this.totalSecondInput
        );
        this.totalThirdInput = this.calculateTotal(val3, this.totalThirdInput);
      });
  }
  displayBill() {
    this.showBill = true;
  }
  print(bill: HTMLDivElement) {
    const openedWindow = window.open('_blanc', 'PRINT');
    openedWindow?.document.write(`<html><head><title>Facture d'achat</title>`);
    openedWindow?.document.write(`
    <style>
    .print-hidden{
  display: none;
} *
  {
    border: 0;
    box-sizing: content-box;
    color: inherit;
    font-family: system-ui;
    font-size: system-ui;
    font-style: system-ui;
    margin: 0;
    padding: 0;
    text-decoration: none;
    vertical-align: top;
  }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; padding: 0.5in; }
html { background: #999; cursor: default; }

body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

@page { margin: 0; }


    </style>`);
    openedWindow?.document.write('</head><body >');
    openedWindow?.document.write(
      '<h1 style="margin-bottom: 3rem">' + 'F A C T U R E' + '</h1>'
    );
    openedWindow?.document.write(bill.innerHTML);
    openedWindow?.document.write('</body></html>');
    openedWindow?.document.close(); // necessary for IE >= 10
    openedWindow?.focus(); // necessary for IE >= 10*/
    openedWindow?.print();
    openedWindow?.close();
    return true;
  }

  calculateTaxe(finalResult, sumTaxes) {
    finalResult.forEach((val) => {
      const initialTax = (val.price * val.appliedTax) / 100;
      const roundedTax = Math.ceil(initialTax * 20) / 20;
      val.finalPrice = ((val.price + roundedTax) * val.quantity).toFixed(2);
      sumTaxes += roundedTax;
    });
    return sumTaxes;
  }
  calculateTotal(inputValue, sum) {
    inputValue.forEach((value) => {
      sum = sum + parseFloat(value.finalPrice);
    });
    this.totalSum += sum;
    return sum;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
