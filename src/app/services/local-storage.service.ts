import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public setToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getFromLocalStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  public removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
