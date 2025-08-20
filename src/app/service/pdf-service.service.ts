import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  private apiUrl = "https://anuruthsv-pdfsummarizer-backend.hf.space";

  constructor(private http: HttpClient) {}

  summarizePdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/summarize-pdf/`, formData);
  }
}
