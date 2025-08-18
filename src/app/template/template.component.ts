import { Component, OnInit } from '@angular/core';
import { PdfServiceService } from '../service/pdf-service.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  selectedFile: File | null = null;
  summary: string = '';
  loading: boolean = false;

  constructor(private pdfService: PdfServiceService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  summarizePdf() {
    if (!this.selectedFile) return;

    this.loading = true;
    this.pdfService.summarizePdf(this.selectedFile).subscribe({
      next: (res) => {
        this.summary = res.summary;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  downloadSummary() {
    const blob = new Blob([this.summary], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'summary.txt';
    link.click();
  }

}
