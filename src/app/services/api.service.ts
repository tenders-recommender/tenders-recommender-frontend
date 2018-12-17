import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiArrayData} from '../model/api-array-data';
import {Interaction} from '../model/interaction';
import { PlotType } from '../model/plots/plot-type.enum';
import {Recommendation} from '../model/recommendation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly recommenderServiceUrl = 'http://localhost:5000/';
  private readonly recommendationsUrl = this.recommenderServiceUrl + 'recommendations/';
  private readonly currentDataRmseUrl = this.recommenderServiceUrl + 'rmse';
  private readonly populateInteractionsUrl = this.recommenderServiceUrl + 'populate_interactions';
  private readonly trainAlgorithmUrl = this.recommenderServiceUrl + 'train_algorithm';
  private readonly svgRepositoryUrl = 'https://raw.githubusercontent.com/tenders-recommender/tenders-recommender/master/plots/';

  constructor(private http: HttpClient) {
  }

  public populateInteractions(interactions: ReadonlyArray<Interaction> | string): Promise<boolean> {
    return this.http.post<boolean>(this.populateInteractionsUrl, interactions)
      .toPromise();
  }

  public trainAlgorithm(): Promise<boolean> {
    return this.http.get<boolean>(this.trainAlgorithmUrl)
      .toPromise();
  }

  public getRecommendations(userId: number, topN?: number): Promise<ReadonlyArray<Recommendation>> {
    let requestOptions = {};

    if (topN) {
      requestOptions = {
        params: {top: topN}
      };
    }

    return this.http.get<ApiArrayData<Recommendation>>(this.recommendationsUrl + userId, requestOptions)
      .toPromise()
      .then(apiData => apiData.data);
  }

  public getCurrentRmse(): Promise<number> {
    return this.http.get<number>(this.currentDataRmseUrl)
      .toPromise();
  }

  public getPlotSvg(plotType: PlotType): Promise<string> {
    return this.http.get(this.svgRepositoryUrl + plotType, { responseType: 'text' })
      .toPromise();
  }
}
