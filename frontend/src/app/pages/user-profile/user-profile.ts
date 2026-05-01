import { Component, signal, computed ,InputSignal, input,ModelSignal,model} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiInputComponent } from '../../shared/ui-input/ui-input';
import { UiButton } from '../../shared/ui-button/ui-button';

interface FieldState {
  value: string;
  touched: boolean;
}

interface ActivityItem {
  label: string;
  time: string;
  color: string;
}

interface CalendarEvent {
  date: string;
  label: string;
  color: string;
}

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phone_pattern = /^\d{6,14}$/;

function validateEmail(v: string): string {
  if (!v) return 'Email обов\'язковий';
  if (!email_pattern.test(v)) return 'Некоректний формат email';
  return '';
}
function validatePhone(v: string): string {
  if (!v) return 'Номер обов\'язковий';
  if (!phone_pattern.test(v)) return 'Введіть коректний номер';
  return '';
}
function validateBio(v: string): string {
  if (v.length > 500) return 'Максимум 500 символів';
  return '';
}
function validateUsername(v: string): string {
  if (!v) return 'Нікнейм обов\'язковий';
  if (v.length < 3) return 'Мінімум 3 символи';
  return '';
}

export const country_codes = [
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+1',   flag: '🇺🇸', name: 'USA / Canada' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+48',  flag: '🇵🇱', name: 'Poland' },
  { code: '+86',  flag: '🇨🇳', name: 'China' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan' },
  { code: '+34',  flag: '🇪🇸', name: 'Spain' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy' },
  { code: '+31',  flag: '🇳🇱', name: 'Netherlands' },
  { code: '+90',  flag: '🇹🇷', name: 'Turkey' },
  { code: '+82',  flag: '🇰🇷', name: 'South Korea' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
  { code: '+91',  flag: '🇮🇳', name: 'India' },
];

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UiInputComponent, UiButton],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class UserProfile {

  public readonly avatarUrl:ModelSignal<string>=model<string>('');
  public readonly activeTab:ModelSignal<string>=model<string>('personal');

  settingsTabs = [
    { id: 'personal', label: 'Personal info' },
    { id: 'gaming',   label: 'Gaming profile' },
    { id: 'contacts', label: 'Contacts' },
  ];

  public readonly firstNameField :InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly lastNameField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly birthdayField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly genderField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly countryField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly cityField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly bioField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });

  public readonly usernameField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly gameStyleField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly teamField         : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly achievementsField : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });

  public readonly emailField       : InputSignal<FieldState>=input<FieldState>({ value: '', touched: false });
  public readonly phoneField       : InputSignal<FieldState>=input  <FieldState>({ value: '', touched: false });
  public readonly selectedCode     : ModelSignal<string>=model<string>('+380');
  public readonly discordField     : ModelSignal<FieldState>=model<FieldState>({ value: '', touched: false });
  public readonly telegramField    : ModelSignal<FieldState>=model<FieldState>({ value: '', touched: false });
  public readonly showCodeDropdown : ModelSignal<boolean>=model<boolean>(false);

  public readonly displayName :ModelSignal<string>=model<string>('Name Surname');
  public readonly role :ModelSignal<string>=model<string>('Participant');
  public readonly tournaments :ModelSignal<number>=model<number>(15);
  public readonly wins :ModelSignal<number>=model<number>(9);
  public readonly rate :ModelSignal<string>=model<string>('#7');

  readonly countryCodes = country_codes;

  recentActivity = signal<ActivityItem[]>([
    { label: 'Won tournament #14', time: '2d ago', color: '#1D9E75' },
    { label: 'Joined Kyiv Open',   time: '5d ago', color: '#534AB7' },
    { label: 'Profile updated',    time: '1w ago', color: '#BA7517' },
    { label: 'Rank reached #7',    time: '2w ago', color: '#378ADD' },
  ]);

  private _today = new Date();
  calendarYear  = signal<number>(this._today.getFullYear());
  calendarMonth = signal<number>(this._today.getMonth());

  private fmt(y: number, m: number, d: number): string {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }

  calendarEvents = signal<CalendarEvent[]>([
    { date: this.fmt(this._today.getFullYear(), this._today.getMonth(), 5),  label: 'Kyiv Open',     color: '#534AB7' },
    { date: this.fmt(this._today.getFullYear(), this._today.getMonth(), 12), label: 'Team practice', color: '#1D9E75' },
    { date: this.fmt(this._today.getFullYear(), this._today.getMonth(), 18), label: 'LAN final',     color: '#E24B4A' },
    { date: this.fmt(this._today.getFullYear(), this._today.getMonth(), 24), label: 'Online cup',    color: '#BA7517' },
  ]);

  calendarDays = computed(() => {
    const y = this.calendarYear();
    const m = this.calendarMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const offset = (firstDay + 6) % 7;
    const days: { day: number | null; dateStr: string }[] = [];
    for (let i = 0; i < offset; i++) days.push({ day: null, dateStr: '' });
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, dateStr: this.fmt(y, m, d) });
    }
    return days;
  });

  calendarMonthLabel = computed(() =>
    new Date(this.calendarYear(), this.calendarMonth(), 1)
      .toLocaleString('en-US', { month: 'long', year: 'numeric' })
  );

  readonly weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  prevMonth(): void {
    if (this.calendarMonth() === 0) { this.calendarMonth.set(11); this.calendarYear.update(y => y - 1); }
    else { this.calendarMonth.update(m => m - 1); }
  }
  nextMonth(): void {
    if (this.calendarMonth() === 11) { this.calendarMonth.set(0); this.calendarYear.update(y => y + 1); }
    else { this.calendarMonth.update(m => m + 1); }
  }

  getEventsForDate(dateStr: string): CalendarEvent[] {
    return this.calendarEvents().filter(e => e.date === dateStr);
  }

  isToday(dateStr: string): boolean {
    return dateStr === this.fmt(this._today.getFullYear(), this._today.getMonth(), this._today.getDate());
  }

  readonly allProfileItems = [
    { key: 'avatar',    label: 'Profile picture', weight: 15 },
    { key: 'firstName', label: 'First name',      weight: 10 },
    { key: 'lastName',  label: 'Last name',       weight: 10 },
    { key: 'birthday',  label: 'Birthday',        weight: 5  },
    { key: 'username',  label: 'Username',        weight: 15 },
    { key: 'email',     label: 'Email',           weight: 15 },
    { key: 'phone',     label: 'Phone',           weight: 10 },
    { key: 'country',   label: 'Country',         weight: 10 },
    { key: 'bio',       label: 'Biography',       weight: 10 },
  ];

  completedFields = computed<Record<string, boolean>>(() => ({
    avatar:    this.avatarUrl().length > 0,
    firstName: !!this.firstNameField().value.trim(),
    lastName:  !!this.lastNameField().value.trim(),
    birthday:  !!this.birthdayField().value,
    username:  !validateUsername(this.usernameField().value),
    email:     !validateEmail(this.emailField().value),
    phone:     !validatePhone(this.phoneField().value),
    country:   !!this.countryField().value.trim(),
    bio:       this.bioField().value.trim().length > 0,
  }));

  profileCompletion = computed(() =>
    this.allProfileItems.reduce(
      (sum, item) => sum + (this.completedFields()[item.key] ? item.weight : 0), 0
    )
  );

  readonly circumference = 2 * Math.PI * 26;

  dashOffset = computed(() =>
    this.circumference * (1 - this.profileCompletion() / 100)
  );

  progressColor = computed(() => {
    const p = this.profileCompletion();
    if (p < 40) return '#E24B4A';
    if (p < 70) return '#BA7517';
    return '#1D9E75';
  });

   public readonly isLoading:ModelSignal<boolean>=model<boolean>(false);
  public readonly isSaved:ModelSignal<boolean>=model<boolean>(false);
  setField(sig: any, value: string): void {
    sig.set({ value, touched: true });
  }

  setTab(id: string): void { this.activeTab.set(id); }

  toggleCodeDropdown(): void { this.showCodeDropdown.update(v => !v); }

  selectCode(code: string): void {
    this.selectedCode.set(code);
    this.showCodeDropdown.set(false);
  }

  triggerUpload(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => this.avatarUrl.set(reader.result as string);
      reader.readAsDataURL(file);
    };
    input.click();
  }

  removeAvatar(): void { this.avatarUrl.set(''); }

  async onSubmit(): Promise<void> {
    this.isLoading.set(true);
    this.isSaved.set(false);
    try {
      await new Promise(r => setTimeout(r, 900));
      this.isSaved.set(true);
      const fn = this.firstNameField().value;
      const ln = this.lastNameField().value;
      if (fn || ln) this.displayName.set(`${fn} ${ln}`.trim());
    } finally {
      this.isLoading.set(false);
    }
  }
}