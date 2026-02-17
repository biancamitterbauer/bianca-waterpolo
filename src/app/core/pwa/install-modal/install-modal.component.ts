import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallService } from '../install.service';

@Component({
  selector: 'app-install-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './install-modal.component.html',
  styleUrls: ['./install-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallModalComponent {
  constructor(public install: InstallService) {}
}
