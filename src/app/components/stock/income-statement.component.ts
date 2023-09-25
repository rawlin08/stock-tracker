import { Component } from '@angular/core';

@Component({
  selector: 'app-income-statement',
  template: `
  <div id="canvasjs-angular-chart-container-0">
    <canvasjs-chart [options]="chartOptions"></canvasjs-chart>
  </div>
  `,
  styles: [``]
})
export class IncomeStatementComponent {
  constructor() {}

  chartOptions = {
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }]                
  };
}
