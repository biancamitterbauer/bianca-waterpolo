import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeoService } from '../../core/seo/seo.service';

type SubmitState = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly recipientEmail = 'ralf.mitterbauer@t-online.de';

  readonly isBrowser = isPlatformBrowser(this.platformId);
  isSubmitting = false;
  submitState: SubmitState = 'idle';

  readonly contactForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    organization: [''],
    phone: [''],
    topic: ['Sponsoring', [Validators.required]],
    preferredContact: ['Telefon', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
    consent: [false, [Validators.requiredTrue]],
  });

  constructor() {
    this.seo.updateSeo({
      title: 'Kontakt | Bianca Mitterbauer',
      description:
        'Professionelles Kontaktformular für Sponsoring, Medienanfragen und Kooperationen rund um Bianca Mitterbauer.',
      image: 'https://biancamitterbauer.de/assets/images/logos/logo_dsv.png',
      url: 'https://biancamitterbauer.de/contact',
      canonical: 'https://biancamitterbauer.de/contact',
    });
  }

  get messageLength(): number {
    return this.contactForm.controls.message.value.length;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.submitState = 'error';
      return;
    }

    this.isSubmitting = true;
    this.submitState = 'idle';

    const formValue = this.contactForm.getRawValue();
    const subject = `Kontaktanfrage: ${formValue.topic} – ${formValue.fullName}`;
    const bodyLines = [
      `Name: ${formValue.fullName}`,
      `Organisation: ${formValue.organization || '-'}`,
      `Telefon: ${formValue.phone || '-'}`,
      `Bevorzugter Kontaktweg: ${formValue.preferredContact}`,
      '',
      'Nachricht:',
      formValue.message,
    ];

    const mailtoUrl = `mailto:${this.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    if (this.isBrowser) {
      window.location.href = mailtoUrl;
    }

    this.isSubmitting = false;
    this.submitState = 'success';
    this.contactForm.reset({
      fullName: '',
      organization: '',
      phone: '',
      topic: 'Sponsoring',
      preferredContact: 'Telefon',
      message: '',
      consent: false,
    });
  }
}
