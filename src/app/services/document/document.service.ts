// document.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) {
    this.tokenKey = 'authToken';
  }

  private tokenKey: string;

  getDocuments(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });

    const apiUrl = `${environment.apiBaseUrl}/ingestion/documents`;
    return this.http.get(apiUrl, { headers });
  }

  uploadDocument(title: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });

    const apiUrl = `${environment.apiBaseUrl}/ingestion/upload`;

    return this.http.post(apiUrl, formData, { headers });
  }

  deleteDocument(id:string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });

    const apiUrl = `${environment.apiBaseUrl}/ingestion/documents/${id}`;
    return this.http.delete(apiUrl, { headers });
  }

  downloadDocument(s3key: string) {
    debugger;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    });
    const apiUrl = `${environment.apiBaseUrl}/ingestion/download/${s3key}`;
    return this.http.get(apiUrl, { headers, responseType: 'blob' });
  }
}
