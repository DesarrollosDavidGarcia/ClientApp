import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AutenticacionService } from 'src/app/guards/autenticacion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,    private autenticacion: AutenticacionService) {


  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.router.navigate(['/dashboards/dashboard1']);
  }
}
