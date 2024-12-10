import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ResumeService } from '../../core/services/resume.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ResumeFormComponent implements OnInit {
  resumeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.resumeForm = this.fb.group({
      personalInfo: this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: [''],
        professionalSummary: ['']
      }),
      experience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      languages: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.resumeForm.valueChanges.subscribe(value => {
      this.resumeService.updateResume(value);
    });
  }

  exportToPDF(): void {
    this.resumeService.exportToPDF();
  }
}
