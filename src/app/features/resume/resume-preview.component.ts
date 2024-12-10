import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="resume-preview p-8 bg-white" #resumeContent>
      <!-- Encabezado -->
      <header class="text-center mb-8 border-b pb-6">
        <h1 class="text-3xl font-bold text-gray-800">{{personalInfo.fullName}}</h1>
        <p class="text-xl text-gray-600 mt-2">{{personalInfo.title}}</p>
        <div class="mt-4 text-gray-600">
          <p>{{personalInfo.email}} | {{personalInfo.phone}}</p>
          <p>{{personalInfo.location}}</p>
          <p *ngIf="personalInfo.linkedin">LinkedIn: {{personalInfo.linkedin}}</p>
        </div>
      </header>

      <!-- Resumen Profesional -->
      <section class="mb-8" *ngIf="professionalSummary">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b">Resumen Profesional</h2>
        <p class="text-gray-700">{{professionalSummary}}</p>
      </section>

      <!-- Experiencia -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b">Experiencia Profesional</h2>
        <div *ngFor="let exp of workExperiences" class="mb-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-gray-700">{{exp.position}}</h3>
              <h4 class="text-lg text-gray-600">{{exp.company}}</h4>
            </div>
            <div class="text-gray-600">
              {{exp.startDate}} - {{exp.endDate}}
            </div>
          </div>
          <ul class="list-disc ml-6 mt-2">
            <li *ngFor="let resp of exp.responsibilities" class="text-gray-700">
              {{resp}}
            </li>
          </ul>
        </div>
      </section>

      <!-- Educación -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b">Educación</h2>
        <div *ngFor="let edu of education" class="mb-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-gray-700">{{edu.degree}}</h3>
              <h4 class="text-lg text-gray-600">{{edu.institution}}</h4>
            </div>
            <div class="text-gray-600">{{edu.year}}</div>
          </div>
          <ul *ngIf="edu.achievements.length" class="list-disc ml-6 mt-2">
            <li *ngFor="let achievement of edu.achievements" class="text-gray-700">
              {{achievement}}
            </li>
          </ul>
        </div>
      </section>

      <!-- Habilidades -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b">Habilidades</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Técnicas</h3>
            <ul class="list-disc ml-6">
              <li *ngFor="let skill of skills.technical" class="text-gray-700">{{skill}}</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Blandas</h3>
            <ul class="list-disc ml-6">
              <li *ngFor="let skill of skills.soft" class="text-gray-700">{{skill}}</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Idiomas</h3>
            <ul class="list-disc ml-6">
              <li *ngFor="let lang of skills.languages" class="text-gray-700">{{lang}}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Certificaciones -->
      <section class="mb-8" *ngIf="certifications.length">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b">Certificaciones</h2>
        <div *ngFor="let cert of certifications" class="mb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-gray-700">{{cert.name}}</h3>
              <p class="text-gray-600">{{cert.institution}}</p>
            </div>
            <div class="text-gray-600">{{cert.date}}</div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .resume-preview {
      max-width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    @media print {
      .resume-preview {
        box-shadow: none;
      }
    }
  `]
})
export class ResumePreviewComponent {
  @Input() personalInfo: any;
  @Input() professionalSummary: string = '';
  @Input() workExperiences: any[] = [];
  @Input() education: any[] = [];
  @Input() skills: any = {};
  @Input() certifications: any[] = [];
}
