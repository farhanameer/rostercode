import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionExpireService {

  constructor(private router: Router) { }

  ifSessionExpried(error) {
    if(error.statusCode == 401)
      this.router.navigate(['/login']);
  }
}
