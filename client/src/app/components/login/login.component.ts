import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService){}

  login(){
    let subscriber = {
      username: this.username,
      password: this.password
    }

    return this.authService.login(subscriber).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
