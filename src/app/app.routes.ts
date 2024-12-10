import { Routes } from '@angular/router';
import { ResumeComponent } from './features/resume/resume.component';

export const routes: Routes = [
  { path: '', component: ResumeComponent },
  { path: '**', redirectTo: '' }
];
