import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  achievements: string[];
}

interface Certification {
  name: string;
  institution: string;
  date: string;
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 p-8">
      <!-- Botón de Exportar PDF -->
      <div class="fixed bottom-8 right-8 z-50">
        <button (click)="exportToPDF()" 
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center space-x-2">
          <span class="material-icons">picture_as_pdf</span>
          <span>Exportar PDF</span>
        </button>
      </div>

      <div class="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-md" #resumeContent>
        <!-- Información Personal -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Información Personal</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <input type="text" [(ngModel)]="personalInfo.fullName" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Título Profesional</label>
              <input type="text" [(ngModel)]="personalInfo.title" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input type="email" [(ngModel)]="personalInfo.email" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Teléfono</label>
              <input type="tel" [(ngModel)]="personalInfo.phone" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Ubicación</label>
              <input type="text" [(ngModel)]="personalInfo.location" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input type="url" [(ngModel)]="personalInfo.linkedin" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
          </div>
        </section>

        <!-- Resumen Profesional -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Resumen Profesional</h2>
          <textarea [(ngModel)]="professionalSummary" rows="4" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
        </section>

        <!-- Experiencia Laboral -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Experiencia Laboral</h2>
          <div *ngFor="let exp of workExperiences; let i = index" class="mb-6 p-4 bg-gray-50 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Empresa</label>
                <input type="text" [(ngModel)]="exp.company" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Cargo</label>
                <input type="text" [(ngModel)]="exp.position" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                <input type="text" [(ngModel)]="exp.startDate" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha Fin</label>
                <input type="text" [(ngModel)]="exp.endDate" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700">Responsabilidades</label>
              <div *ngFor="let resp of exp.responsibilities; let j = index" class="mt-2">
                <div class="flex gap-2">
                  <input type="text" [(ngModel)]="exp.responsibilities[j]" 
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <button *ngIf="j > 0" (click)="removeResponsibility(exp, j)" 
                          class="text-red-500 hover:text-red-700">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
              <button (click)="addResponsibility(exp)" 
                      class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                + Agregar Responsabilidad
              </button>
            </div>
          </div>
          <button (click)="addWorkExperience()" 
                  class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
            + Agregar Experiencia
          </button>
        </section>

        <!-- Educación -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Educación</h2>
          <div *ngFor="let edu of education" class="mb-6 p-4 bg-gray-50 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" [(ngModel)]="edu.degree" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Institución</label>
                <input type="text" [(ngModel)]="edu.institution" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Año</label>
                <input type="text" [(ngModel)]="edu.year" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700">Logros</label>
              <div *ngFor="let achievement of edu.achievements; let j = index" class="mt-2">
                <div class="flex gap-2">
                  <input type="text" [(ngModel)]="edu.achievements[j]" 
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <button *ngIf="j > 0" (click)="removeAchievement(edu, j)" 
                          class="text-red-500 hover:text-red-700">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
              <button (click)="addAchievement(edu)" 
                      class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                + Agregar Logro
              </button>
            </div>
          </div>
          <button (click)="addEducation()" 
                  class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
            + Agregar Educación
          </button>
        </section>

        <!-- Habilidades -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Habilidades</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 class="text-lg font-semibold mb-2 text-gray-700">Habilidades Técnicas</h3>
              <div *ngFor="let skill of skills.technical; let i = index" class="mt-2">
                <div class="flex gap-2">
                  <input type="text" [(ngModel)]="skills.technical[i]" 
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <button *ngIf="i > 0" (click)="removeSkill('technical', i)" 
                          class="text-red-500 hover:text-red-700">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
              <button (click)="addSkill('technical')" 
                      class="mt-2 text-blue-600 hover:text-blue-800">
                + Agregar
              </button>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2 text-gray-700">Habilidades Blandas</h3>
              <div *ngFor="let skill of skills.soft; let i = index" class="mt-2">
                <div class="flex gap-2">
                  <input type="text" [(ngModel)]="skills.soft[i]" 
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <button *ngIf="i > 0" (click)="removeSkill('soft', i)" 
                          class="text-red-500 hover:text-red-700">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
              <button (click)="addSkill('soft')" 
                      class="mt-2 text-blue-600 hover:text-blue-800">
                + Agregar
              </button>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2 text-gray-700">Idiomas</h3>
              <div *ngFor="let lang of skills.languages; let i = index" class="mt-2">
                <div class="flex gap-2">
                  <input type="text" [(ngModel)]="skills.languages[i]" 
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <button *ngIf="i > 0" (click)="removeSkill('languages', i)" 
                          class="text-red-500 hover:text-red-700">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
              <button (click)="addSkill('languages')" 
                      class="mt-2 text-blue-600 hover:text-blue-800">
                + Agregar
              </button>
            </div>
          </div>
        </section>

        <!-- Certificaciones -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Certificaciones</h2>
          <div *ngFor="let cert of certifications; let i = index" class="mb-6 p-4 bg-gray-50 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" [(ngModel)]="cert.name" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Institución</label>
                <input type="text" [(ngModel)]="cert.institution" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha</label>
                <input type="text" [(ngModel)]="cert.date" 
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              </div>
            </div>
            <button *ngIf="i > 0" (click)="removeCertification(i)" 
                    class="mt-2 text-red-500 hover:text-red-700">
              Eliminar
            </button>
          </div>
          <button (click)="addCertification()" 
                  class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
            + Agregar Certificación
          </button>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  personalInfo = {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: ''
  };

  professionalSummary = '';

  workExperiences: WorkExperience[] = [{
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    responsibilities: ['']
  }];

  education: Education[] = [{
    degree: '',
    institution: '',
    year: '',
    achievements: ['']
  }];

  skills = {
    technical: [''],
    soft: [''],
    languages: ['']
  };

  certifications: Certification[] = [{
    name: '',
    institution: '',
    date: ''
  }];

  exportToPDF() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Configuración inicial
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = margin;
    const lineHeight = 7;

    // Función helper para centrar texto
    const centerText = (text: string, y: number) => {
      const fontSize = doc.getFontSize();
      const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, y);
    };

    // Función helper para agregar una línea divisoria
    const addDivider = (y: number) => {
      doc.setDrawColor(100, 100, 100);
      doc.line(margin, y, pageWidth - margin, y);
    };

    // Función helper para manejar texto largo
    const addWrappedText = (text: string, y: number, maxWidth: number = pageWidth - 2 * margin) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, margin, y);
      return lines.length * lineHeight;
    };

    // Encabezado
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    centerText(this.personalInfo.fullName || 'Nombre Completo', yPos);
    yPos += lineHeight + 3;

    doc.setFontSize(16);
    doc.setTextColor(80, 80, 80);
    centerText(this.personalInfo.title || 'Título Profesional', yPos);
    yPos += lineHeight + 3;

    // Información de contacto
    doc.setFontSize(10);
    const contactInfo = [
      this.personalInfo.email,
      this.personalInfo.phone,
      this.personalInfo.location,
      this.personalInfo.linkedin
    ].filter(info => info).join(' | ');
    
    if (contactInfo) {
      centerText(contactInfo, yPos);
      yPos += lineHeight + 5;
    }

    // Resumen Profesional
    if (this.professionalSummary) {
      yPos += 5;
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Resumen Profesional', margin, yPos);
      yPos += lineHeight;
      
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      yPos += addWrappedText(this.professionalSummary, yPos);
    }

    // Experiencia Laboral
    if (this.workExperiences.some(exp => exp.company || exp.position)) {
      yPos += 10;
      addDivider(yPos - 2);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Experiencia Laboral', margin, yPos);
      yPos += lineHeight;

      this.workExperiences.forEach(exp => {
        if (exp.company || exp.position) {
          if (yPos > 270) {
            doc.addPage();
            yPos = margin;
          }

          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`${exp.position}${exp.company ? ' - ' + exp.company : ''}`, margin, yPos);
          yPos += lineHeight;

          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          if (exp.startDate || exp.endDate) {
            doc.text(`${exp.startDate || ''} - ${exp.endDate || ''}`, margin, yPos);
            yPos += lineHeight;
          }

          doc.setTextColor(60, 60, 60);
          exp.responsibilities.forEach(resp => {
            if (resp) {
              if (yPos > 270) {
                doc.addPage();
                yPos = margin;
              }
              yPos += addWrappedText(`• ${resp}`, yPos);
            }
          });
          yPos += 5;
        }
      });
    }

    // Educación
    if (this.education.some(edu => edu.degree || edu.institution)) {
      yPos += 5;
      addDivider(yPos - 2);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Educación', margin, yPos);
      yPos += lineHeight;

      this.education.forEach(edu => {
        if (edu.degree || edu.institution) {
          if (yPos > 270) {
            doc.addPage();
            yPos = margin;
          }

          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`${edu.degree}${edu.institution ? ' - ' + edu.institution : ''}`, margin, yPos);
          yPos += lineHeight;

          if (edu.year) {
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(edu.year, margin, yPos);
            yPos += lineHeight;
          }

          doc.setTextColor(60, 60, 60);
          edu.achievements.forEach(achievement => {
            if (achievement) {
              if (yPos > 270) {
                doc.addPage();
                yPos = margin;
              }
              yPos += addWrappedText(`• ${achievement}`, yPos);
            }
          });
          yPos += 5;
        }
      });
    }

    // Habilidades
    if (this.skills.technical.some(s => s) || this.skills.soft.some(s => s) || this.skills.languages.some(s => s)) {
      yPos += 5;
      addDivider(yPos - 2);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Habilidades', margin, yPos);
      yPos += lineHeight + 2;

      const addSkillSection = (title: string, skills: string[]) => {
        if (skills.some(s => s)) {
          if (yPos > 270) {
            doc.addPage();
            yPos = margin;
          }
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(title, margin, yPos);
          yPos += lineHeight;

          doc.setFontSize(10);
          doc.setTextColor(60, 60, 60);
          const skillText = skills.filter(s => s).join(' • ');
          yPos += addWrappedText(skillText, yPos);
          yPos += 5;
        }
      };

      addSkillSection('Habilidades Técnicas', this.skills.technical);
      addSkillSection('Habilidades Blandas', this.skills.soft);
      addSkillSection('Idiomas', this.skills.languages);
    }

    // Certificaciones
    if (this.certifications.some(cert => cert.name || cert.institution)) {
      yPos += 5;
      addDivider(yPos - 2);
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Certificaciones', margin, yPos);
      yPos += lineHeight;

      this.certifications.forEach(cert => {
        if (cert.name || cert.institution) {
          if (yPos > 270) {
            doc.addPage();
            yPos = margin;
          }

          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`${cert.name}${cert.institution ? ' - ' + cert.institution : ''}`, margin, yPos);
          yPos += lineHeight;

          if (cert.date) {
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(cert.date, margin, yPos);
            yPos += lineHeight;
          }
        }
      });
    }

    // Guardar el PDF
    doc.save('mi-curriculum.pdf');
  }

  addWorkExperience() {
    this.workExperiences.push({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: ['']
    });
  }

  addEducation() {
    this.education.push({
      degree: '',
      institution: '',
      year: '',
      achievements: ['']
    });
  }

  addCertification() {
    this.certifications.push({
      name: '',
      institution: '',
      date: ''
    });
  }

  addResponsibility(experience: WorkExperience) {
    experience.responsibilities.push('');
  }

  removeResponsibility(experience: WorkExperience, index: number) {
    experience.responsibilities.splice(index, 1);
  }

  addAchievement(education: Education) {
    education.achievements.push('');
  }

  removeAchievement(education: Education, index: number) {
    education.achievements.splice(index, 1);
  }

  addSkill(type: 'technical' | 'soft' | 'languages') {
    this.skills[type].push('');
  }

  removeSkill(type: 'technical' | 'soft' | 'languages', index: number) {
    this.skills[type].splice(index, 1);
  }

  removeCertification(index: number) {
    this.certifications.splice(index, 1);
  }
}
