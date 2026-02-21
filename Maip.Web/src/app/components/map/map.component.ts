import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { SpatialResult } from '../../services/spatial.service';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div #mapContainer class="map-container"></div>`,
  styles: [`
    .map-container {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
    }
    ::ng-deep .near-marker { color: #6366f1; }
    ::ng-deep .far-marker { color: #a855f7; }
  `]
})
export class MapComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @Input() results: SpatialResult[] = [];

  map!: Map;
  markers: Marker[] = [];

  ngAfterViewInit() {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'https://tiles.openfreemap.org/styles/bright',
      center: [77.5946, 12.9716],
      zoom: 12
    });

    this.map.addControl(new NavigationControl());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['results'] && this.map) {
      this.updateMarkers();
    }
  }

  private updateMarkers() {
    // Clear existing markers
    this.markers.forEach(m => m.remove());
    this.markers = [];

    this.results.forEach(res => {
      const el = document.createElement('div');
      el.className = res.isNear ? 'near-marker' : 'far-marker';
      el.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`;

      const marker = new Marker({ element: el })
        .setLngLat([res.longitude, res.latitude])
        .setPopup(new Popup().setHTML(`<strong>${res.name}</strong><p>${res.description}</p>`))
        .addTo(this.map);

      this.markers.push(marker);
    });

    if (this.results.length > 0) {
      const coords = this.results.map(r => [r.longitude, r.latitude] as [number, number]);
      // Simple bounds logic could be added here
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}

