import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  electricCalculationsForm = this.fb.group({
    kVA: [
      null,
      [Validators.required, Validators.pattern('^([0-9]*.?[0-9]+)?$')],
    ],
    costPerkVA: [
      null,
      [Validators.required, Validators.pattern('^([0-9]*.?[0-9]+)?$')],
    ],
    fullChargeKWH: [
      null,
      [Validators.required, Validators.pattern('^([0-9]*.?[0-9]+)?$')],
    ],
  });
  result: string | null = '0';

  constructor(private fb: FormBuilder) {}

  makeCalculation(): boolean {
    for (const field in this.electricCalculationsForm.controls) {
      if (this.electricCalculationsForm.get(field)?.invalid) {
        this.result = null;
        return false;
      }
    }

    const powerFactor = 0.9;
    const kW = powerFactor * Number(this.electricCalculationsForm.value.kVA);
    const costPerKWH =
      Number(this.electricCalculationsForm.value.costPerkVA) / kW;
    this.result = String(
      Number(this.electricCalculationsForm.value.fullChargeKWH) * costPerKWH
    );

    // Round the result to 2 decimal places
    this.result =
      String(Math.round(Number(this.result) * 100) / 100) +
      '€ a pagar por um carregamento completo.';
    return true;
  }
}
