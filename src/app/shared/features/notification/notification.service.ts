import { Injectable } from '@angular/core';
import { INotification, NotificationType } from '../../utils/dataTypes';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  private notification$: Subject<INotification> | Subject<null> =
    new BehaviorSubject(null);

  success(message: string, duration: number = 1000) {
    this.notify(message, NotificationType.Success, duration);
  }
  warning(message: string, duration: number = 1000) {
    this.notify(message, NotificationType.Warning, duration);
  }
  error(message: string, duration: number = 1000) {
    this.notify(message, NotificationType.Error, duration);
  }

  private notify(message: string, type: NotificationType, duration: number) {
    duration = !duration ? 3000 : duration;
    this.notification$.next({
      message: message,
      type: type,
      duration: duration,
    } as INotification);
  }
  get notification() {
    return this.notification$.asObservable();
  }
}
