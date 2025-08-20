import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  private apiUrl = "https://anuruthsv-pdfSummarizer-backend.hf.space/summarize-pdf";

  constructor(private http: HttpClient) {}

  summarizePdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl, formData);
  }
}
