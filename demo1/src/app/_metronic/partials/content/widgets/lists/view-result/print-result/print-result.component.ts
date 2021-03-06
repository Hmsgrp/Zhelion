import { Component, OnInit,ChangeDetectorRef ,ViewChild,ElementRef} from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as jsPDF from 'jspdf';
import { ActivatedRoute , Router } from '@angular/router';
import { DashboardServicsService } from '../../../../../../../modules/commonServices/dashboard-servics.service';
import { chart } from 'src/app/_metronic/partials/content/widgets/models/chart.model';
import { DatePipe } from '@angular/common';
import html2canvas from 'html2canvas';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
@Component({
  selector: 'app-print-result',
  templateUrl: './print-result.component.html',
  styleUrls: ['./print-result.component.scss']
})
export class PrintResultComponent implements OnInit {
  @ViewChild('htmlData', {static: false}) htmlData: ElementRef;
   getindividualReport :any;
   parameterNames: any[];
   pbnames:any[];
   ResultID:string;
   ResultDetails:any;
   dataloaded:boolean;
   testdata:any[] = [];
   craa:chart[] = [];
   spinnerType = SPINNER.chasingDots;
   resultSummary:any;

   defaultVal = {
    data: [],
    label: '',
  };
  

  constructor(private dashboardServices: DashboardServicsService,private route: ActivatedRoute,private cd: ChangeDetectorRef,private datePipe: DatePipe,private ngxService: NgxUiLoaderService) { }

  // public lineChartData: ChartDataSets[] = [
  //   { data: [2, 3 ,6], label: 'P-IL6' },
  //   { data: [34,4,7], label: 'TNFALPHA' },
  //   { data: [2, 5, 8], label: 'P-IL10' },
  // ];

  public lineChartData:chart[] = [];

  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    legend: {
    	display: true
    },
    tooltips:{
      axis : 'y'
    },scales: {
      xAxes: [
        {
         // drawOnChartArea: false
        }
      ],
      yAxes: [
        {
          type: "linear",
          time: {
           // parser: "YYYY/MM/DD",
          //  unit: "day",
           // displayFormats: {
           //   day: "YYYY/MM/DD"
          //  }
          },
          ticks: {
            reverse: true
          }       
        }
      ]
    }
  };



  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  ngOnInit(): void {
    this.ngxService.start();
    this.dataloaded = false;
    this.route.params.subscribe(params => {
      this.ResultID = params['term1'].toString();
    });

    this.result();

  }

  result()
  {
    this.dashboardServices.RetriveDataForReport(this.ResultID)
      .subscribe(data => {
        this.dataloaded = true;
        this.ResultDetails = data.currentResult;
        this.getindividualReport = data.currentResult.resultJSON;
        this.resultSummary = data.last30DaysResultsList;
        this.parameterNames = [];

        for (var val of this.getindividualReport) {
          this.parameterNames.push(val.parameterName)
          this.defaultVal.data.push(val.testedResult);
       }
       console.log(data.last30DaysResultsList);

     
        
       for (var val of data.last30DaysResultsList) {
         this.lineChartLabels.push(this.datePipe.transform(val.createdOn,"MMM-dd"));
         if(val.resultJSON)
         {
            for (var val1 of val.resultJSON) {
              if(this.craa.filter(x => x.label == val1.parameterName).length > 0)
              {
                this.craa.find(x=>x.label == val1.parameterName).data.push(Number(val1.testedResult));
              }
              else
              {
                const c = new chart();
                c.label = val1.parameterName ;
                c.fill = false;
                c.data.push(Number(val1.testedResult));
                this.craa.push(c);
              } 
            }
         }
       }
        this.lineChartData = this.craa;
        this.cd.detectChanges();
        this.ngxService.stop();
      },
      HttpErrorResponse =>{
      //  this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )    
  }


  htmltoPDF() {
    window.print(); 
  }

}