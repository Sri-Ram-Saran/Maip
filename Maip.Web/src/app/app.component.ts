import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SpatialService, SpatialResult } from './services/spatial.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Maip.Web';
  searchResults: SpatialResult[] = [];

  constructor(private spatialService: SpatialService) { }

  handleSearch(event: { query: string, near: boolean, far: boolean }) {
    console.log('Search initiated:', event);
    // Default to a fixed coordinate for demo purposes
    this.spatialService.search(event.query, 12.9716, 77.5946).subscribe({
      next: (results) => {
        this.searchResults = results;
        console.log('Results received:', results);
      },
      error: (err) => console.error('Search failed:', err)
    });
  }
}
