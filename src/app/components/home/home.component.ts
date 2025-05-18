// home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { DocumentService } from '../../services/document/document.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  documents: Array<{
    documentid: string;
    title: string;
    created_at: string;
    uploaded_by: string;
    processed: boolean;
  }> = [];

  paginatedDocuments:any = [];
  loading = false;
  error = '';
  uploaderrorMessage = '';
  showUploadForm = false;
  newDocTitle = '';
  selectedFile: File | null = null;

  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  constructor(private authService: AuthService, private docService: DocumentService, private router: Router) {}

  ngOnInit() {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.loading = true;
    return this.docService.getDocuments().subscribe({
      next: (data) => {
        this.documents = data;
        this.totalPages = Math.ceil(this.documents.length / this.pageSize);
        this.paginateDocuments();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching documents';
        console.error(err);
        this.loading = false;
        if (err.status === 404) this.router.navigate(['/login']);
      }
    });
    
  }

  paginateDocuments() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedDocuments = this.documents.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateDocuments();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateDocuments();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  deleteDocument(docId:string) {
    this.loading = true;
    const doc = this.documents.filter(d => d.documentid === docId);
    if (doc.length === 0) {
      console.error('Error deleting document: Document not present');
      this.uploaderrorMessage = 'Document not present';
      this.loading = false;
      return;
    }

    if(!doc[0].processed) {
      console.error('Error deleting document: Document not processed');
      this.uploaderrorMessage = 'You cannot delete unprocessed document';
      this.loading = false;
      return;
    }

    this.docService.deleteDocument(docId).subscribe({
      next: () => {
        console.log('Delete successful');
        this.loading = false;
        this.fetchDocuments();
      },
      error: (err) => {
        console.error('Error deleting document:', err);
        this.uploaderrorMessage = err.error.error;
        this.loading = false;
      }
    });
  }

  onUploadSubmit(event: Event) {
    event.preventDefault();
    if (!this.newDocTitle || !this.selectedFile) return;
    
    this.loading = true;
    console.log('Uploading:', this.newDocTitle, this.selectedFile);
    this.docService.uploadDocument(this.newDocTitle, this.selectedFile).subscribe({
      next: () => {
        console.log('Upload successful');
        this.newDocTitle = '';
        this.selectedFile = null;
        this.showUploadForm = false;
        this.fetchDocuments();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error uploading document:', err);
        this.uploaderrorMessage = err.error.error;
        this.loading = false;
      }
    });
  }

  cancelUpload() {
    this.showUploadForm = false;
    this.newDocTitle = '';
    this.selectedFile = null;
  }

  downloadDocument(docId: string, title:string) {
    console.log('Downloading document with ID:', docId);
    this.loading = true;
    this.docService.downloadDocument(docId).subscribe({
      next: (blob:any) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error downloading document:', err);
        this.uploaderrorMessage = err.error.error;
        this.loading = false;
      }
    });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  refreshDocuments() {
    this.uploaderrorMessage = '';
    this.fetchDocuments();
  }
}
