import { Component, OnInit, Input,ChangeDetectorRef } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { chart } from 'src/app/_metronic/partials/content/widgets/models/chart.model';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DashboardServicsService } from '../../../../../../modules/commonServices/dashboard-servics.service';
import { DatePipe } from '@angular/common';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-tiles-widget1',
  templateUrl: './tiles-widget1.component.html',
})
export class TilesWidget1Component implements OnInit {
  @Input() cssClass = '';
  @Input() chartColor = 'primary';
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  colorsThemeBaseColor = '';
  colorsThemeLightColor = '';

  constructor(private cd: ChangeDetectorRef,private dashboardServices: DashboardServicsService,private layout: LayoutService,
    private datePipe: DatePipe
    ) {
  }

  setupLayoutProps() {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.colorsGrayGray500 = this.layout.getProp('js.colors.gray.gray500');
    this.colorsGrayGray200 = this.layout.getProp('js.colors.gray.gray200');
    this.colorsGrayGray300 = this.layout.getProp('js.colors.gray.gray300');
    this.colorsThemeBaseDanger = this.layout.getProp(
      'js.colors.theme.base.danger'
    );
    this.colorsThemeBaseColor = this.layout.getProp(
      `js.colors.theme.base.${this.chartColor}`
    );
    this.colorsThemeLightColor = this.layout.getProp(
      `js.colors.theme.light.${this.chartColor}`
    );
  }

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

  getindividualReport :any;
  parameterNames: any[];
  pbnames:any[];
  ResultID:string;
  ResultDetails:any;
  dataloaded:boolean;
  testdata:any[] = [];
  craa:chart[] = [];
  defaultVal = {
    data: [],
    label: '',
  };
  isempty:boolean;
  

  ngOnInit(): void {
    this.setupLayoutProps();
    this.chartOptions = this.getChartOptions();
    this.ResultID = "5599c639-572b-4ac1-930d-c48d49a0ec1b";
    this.isempty =false;
    this.result();
  }

  getChartOptions() {
    const height = '120px';
    return {
      series: [{
        name: 'Net Profit',
        data: [20, 22, 30, 28, 25, 26, 30, 28, 22, 24, 25, 35]
      }],
      chart: {
        type: 'area',
        height,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
        opacity: 1,
        gradient: {

          type: 'vertical',
          shadeIntensity: 0.55,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.2,
          stops: [25, 50, 100],
          colorStops: []
        }
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.colorsThemeBaseColor]
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        },
        crosshairs: {
          show: false,
          position: 'front',
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      yaxis: {
        min: 0,
        max: 37,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily
        },
        y: {
          formatter: (val) => {
            return `$ ${val} thousands`;
          }
        }
      },
      colors: [this.colorsThemeLightColor],
      markers: {
        colors: [this.colorsThemeLightColor],
        strokeColor: [this.colorsThemeBaseColor],
        strokeWidth: 3
      },
      padding: {
        top: 0,
        bottom: 0
      }
    };
  }

  result()
  {
    this.dashboardServices.RetriveReportforLatestOrder()
      .subscribe(data => {
        if(data.last30DaysResultsList == null)
        {
          this.isempty =true;
        }
        this.getindividualReport = data.currentResult.resultJSON;
        this.parameterNames = [];

        for (var val of this.getindividualReport) {
          this.parameterNames.push(val.parameterName)
          this.defaultVal.data.push(val.testedResult);
       }

        
       for (var val of data.last30DaysResultsList) {
         this.lineChartLabels.push(this.datePipe.transform(val.createdOn,"MMM-dd-yy"));
         if(val.resultJSON)
         {
            for (var val1 of val.resultJSON) {
              if(this.craa.filter(x=>x.label == val1.parameterName).length >0)
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
      },
      HttpErrorResponse =>{
      //  this.handleError(HttpErrorResponse.message+" Check Api");
      }
      )    
  }

}
