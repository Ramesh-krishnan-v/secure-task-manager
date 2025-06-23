import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-task-pie-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './pie-chart.component.html',
})
export class TaskPieChartComponent {
  @Input() set tasks(value: any[]) {
    this._tasks = value || [];
    this.updateChartData();
  }

  private _tasks: any[] = [];

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Completed', 'Pending', 'Not Started'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#22c55e', '#facc15', '#a3a3a3'],
      },
    ],
  };

  updateChartData(): void {
    const completed = this._tasks.filter(t => t.status === 'Completed').length;
    const pending = this._tasks.filter(t => t.status === 'Pending').length;
    const notStarted = this._tasks.filter(t => t.status === 'Not Started').length;

    this.pieChartData = {
      ...this.pieChartData,
      datasets: [
        {
          ...this.pieChartData.datasets[0],
          data: [completed, pending, notStarted]
        }
      ]
    };
  }
}
