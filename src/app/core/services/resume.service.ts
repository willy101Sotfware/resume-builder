import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume } from '../models/resume.model';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeSubject = new BehaviorSubject<Resume | null>(null);
  resume$ = this.resumeSubject.asObservable();

  updateResume(resume: Resume): void {
    this.resumeSubject.next(resume);
  }

  exportToPDF(): void {
    const resume = this.resumeSubject.getValue();
    if (!resume) return;

    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(20);
    doc.text(resume.personalInfo.fullName, 20, 20);
    
    doc.setFontSize(12);
    doc.text(resume.personalInfo.email, 20, 30);
    doc.text(resume.personalInfo.phone, 20, 40);
    
    // Add more sections...
    
    doc.save('resume.pdf');
  }
}
