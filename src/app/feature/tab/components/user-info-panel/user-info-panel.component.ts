import { Component, OnInit, signal } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';

@Component({
  selector: 'app-user-info-panel',
  templateUrl: './user-info-panel.component.html',
  styleUrls: ['./user-info-panel.component.scss'],
})
export class UserInfoPanelComponent implements OnInit {

  user = signal<User | null>(null);

  constructor(readonly auth: Auth) { }

  ngOnInit(): void {
    this.user.set(this.auth.currentUser);
  }

}
