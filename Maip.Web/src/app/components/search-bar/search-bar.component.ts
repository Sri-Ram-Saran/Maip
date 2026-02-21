import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-container">
      <div class="glass-search">
        <input 
          type="text" 
          [(ngModel)]="searchQuery" 
          placeholder="Describe where you want to go..." 
          (keyup.enter)="onSearch()"
        />
        <button (click)="onSearch()">
          <span class="ai-sparkle">✨</span> AI Search
        </button>
      </div>
      @if (searchQuery) {
        <div class="search-options">
          <label>
            <input type="checkbox" [(ngModel)]="includeNear"> Near
          </label>
          <label>
            <input type="checkbox" [(ngModel)]="includeFar"> Far
          </label>
        </div>
      }
    </div>
  `,
  styles: [`
    .search-container {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      width: 600px;
      max-width: 90%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .glass-search {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 40px;
      padding: 8px 12px 8px 24px;
      display: flex;
      align-items: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    .glass-search:focus-within {
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
      transform: scale(1.02);
    }
    input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 16px;
      color: #333;
      padding: 10px 0;
    }
    button {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      color: white;
      border: none;
      border-radius: 30px;
      padding: 10px 24px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: opacity 0.2s;
    }
    button:hover {
      opacity: 0.9;
    }
    .ai-sparkle {
      font-size: 18px;
    }
    .search-options {
      display: flex;
      justify-content: center;
      gap: 20px;
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      padding: 5px 15px;
      border-radius: 20px;
      color: white;
      font-size: 12px;
      font-weight: 600;
    }
  `]
})
export class SearchBarComponent {
  searchQuery: string = '';
  includeNear: boolean = true;
  includeFar: boolean = false;

  @Output() search = new EventEmitter<{ query: string, near: boolean, far: boolean }>();

  onSearch() {
    if (this.searchQuery.trim()) {
      this.search.emit({
        query: this.searchQuery,
        near: this.includeNear,
        far: this.includeFar
      });
    }
  }
}
