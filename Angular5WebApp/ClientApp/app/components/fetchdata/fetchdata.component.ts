import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import * as EventSource from 'eventsource';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent implements OnInit {
    public forecasts: WeatherForecast[];
    private _baseUrl: string;
    constructor(private zone: NgZone, @Inject('BASE_URL') baseUrl: string) {
        /*http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        }, error => console.error(error));*/
        this.forecasts = [];
        this._baseUrl = baseUrl;
    }
    ngOnInit() {
        let eventSource = new EventSource(this._baseUrl + 'api/SampleData/WeatherForecasts');
        eventSource.onmessage = (event => {
            this.zone.run(() => {
                // Do stuff here
                this.forecasts.push(JSON.parse(event.data));
            });
        });
        eventSource.onopen = (a: any) => {
            // Do stuff here
        };
        eventSource.onerror = (e: any) => {
            // Do stuff here
        }
    }
}


interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
