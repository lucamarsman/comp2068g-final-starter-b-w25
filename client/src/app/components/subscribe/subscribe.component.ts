import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  imports: [FormsModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  username: string | undefined;
  password: string | undefined;
  confirm: string | undefined;
  apiResponse: any;

  constructor(private authService: AuthService) {}

  subscribe(){
    if (this.password !== this.confirm) {
      console.log("Passwords do not match!")
      return;
    }

    const subscriber = {
      username:this.username,
      password:this.password
    }

    return this.authService.register(subscriber).subscribe({
      next: response => {
        this.apiResponse = response;
        console.log(this.apiResponse);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
