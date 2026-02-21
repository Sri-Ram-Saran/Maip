import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SpatialResult {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  type: string;
  distance: number;
  isNear: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SpatialService {
  private apiUrl = 'http://localhost:5246/api/search'; // Adjust port if needed

  constructor(private http: HttpClient) { }

  search(query: string, lat: number, lng: number): Observable<SpatialResult[]> {
    return this.http.get<SpatialResult[]>(`${this.apiUrl}?query=${encodeURIComponent(query)}&lat=${lat}&lng=${lng}`);
  }
}
