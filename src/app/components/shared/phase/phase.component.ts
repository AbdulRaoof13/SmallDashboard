import { Component } from '@angular/core';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent {
  phases:any = [
    {phase:1, result:6},
    {phase:2, result:19},
    {phase:3, result:3}
  ]
}
