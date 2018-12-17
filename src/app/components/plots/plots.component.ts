import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PlotType } from '../../model/plots/plot-type.enum';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit {
  @ViewChild('plotDiv') plotDiv: ElementRef;
  readonly plotTypes: string[];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly elementRef: ElementRef,
              private readonly apiService: ApiService) {
    this.plotTypes = Object.keys(PlotType);
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      const plotType = (PlotType[params['type'] as any]) as PlotType;
      this.apiService.getPlotSvg(plotType)
        .then(svg => {
          console.log(svg);
          this.plotDiv.nativeElement.innerHTML = svg;
        });
    });
  }
}
