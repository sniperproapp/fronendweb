import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

   private readonly REFERRAL_KEY = 'referral_id';

  saveReferralId(referralId: string): void {
    if (referralId) {
      localStorage.setItem(this.REFERRAL_KEY, referralId);
    }
  }

  getReferralId(): string | null {
    return localStorage.getItem(this.REFERRAL_KEY);
  }

  clearReferralId(): void {
    localStorage.removeItem(this.REFERRAL_KEY);
  }
}