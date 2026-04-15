import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
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
  private readonly http = inject(HttpClient);

  readonly isBrowser = isPlatformBrowser(this.platformId);
  isSubmitting = false;
  submitState: SubmitState = 'idle';
  errorMessage = '';

  readonly contactForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    organization: [''],
    phone: [''],
    topic: ['Sponsoring', [Validators.required]],
    preferredContact: ['E-Mail', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
    consent: [false, [Validators.requiredTrue]],
    'bot-field': [''],
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

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.submitState = 'error';
      this.errorMessage = 'Bitte prüfe die markierten Pflichtfelder.';
      return;
    }

    if (!this.isBrowser) return;

    this.isSubmitting = true;
    this.submitState = 'idle';
    this.errorMessage = '';

    const formValue = this.contactForm.getRawValue();
    const body = new URLSearchParams();
    body.set('form-name', 'contact');
    body.set('fullName', formValue.fullName);
    body.set('email', formValue.email);
    body.set('organization', formValue.organization);
    body.set('phone', formValue.phone);
    body.set('topic', formValue.topic);
    body.set('preferredContact', formValue.preferredContact);
    body.set('message', formValue.message);
    body.set('bot-field', formValue['bot-field']);

    try {
      await firstValueFrom(
        this.http.post('/__forms.html', body.toString(), {
          headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
          responseType: 'text',
        }),
      );
      this.submitState = 'success';
      this.contactForm.reset({
        fullName: '',
        email: '',
        organization: '',
        phone: '',
        topic: 'Sponsoring',
        preferredContact: 'E-Mail',
        message: '',
        consent: false,
        'bot-field': '',
      });
    } catch (error) {
      this.submitState = 'error';
      this.errorMessage = 'Das Senden ist fehlgeschlagen. Bitte später erneut versuchen oder per E-Mail an ralf.mitterbauer@t-online.de wenden.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
