// home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  documents: Array<{
    id: string;
    title: string;
    created_at: string;
    uploaded_by?: string;
    processed: boolean;
  }> = [];

  loading = false;
  error = '';
  showUploadForm = false;
  newDocTitle = '';
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
    this.documents = this.fetchDocuments();
  }

  loadDocuments() {}

  fetchDocuments() {
    this.loading = false;
    this.error = '';
    return  [
      {
        id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
        title: 'Project Plan',
        created_at: '2025-05-15T09:30:00Z',
        uploaded_by: 'alice',
        processed: true,
      },
      {
        id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
        title: 'Budget Report',
        created_at: '2025-05-16T14:45:00Z',
        uploaded_by: 'bob',
        processed: false,
      },
      {
        id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
        title: 'Meeting Minutes',
        created_at: '2025-05-17T11:20:00Z',
        uploaded_by: 'carol',
        processed: true,
      },
      {
        id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
        title: 'Design Specs',
        created_at: '2025-05-18T08:15:00Z',
        uploaded_by: 'dave',
        processed: false,
      },
    ];
  }

  downloadDocument(docId: string) {
    
  }

  onUploadSubmit(event: Event) {
    event.preventDefault();
    if (!this.newDocTitle || !this.selectedFile) return;

    // For demo, just log the values:
    console.log('Uploading:', this.newDocTitle, this.selectedFile);

    // TODO: Add actual upload logic here (e.g., send FormData to backend)
    
    // Reset form and hide
    this.cancelUpload();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
  
    const file = input.files[0];
    console.log('Selected file:', file);
  
    // TODO: Implement upload logic here
  }

  cancelUpload() {
    this.showUploadForm = false;
    this.newDocTitle = '';
    this.selectedFile = null;
  }

  refreshDocuments() {
    // Your logic to reload the documents list, e.g. call API or reload array
    console.log('Refresh button clicked');
    this.loadDocuments(); // or whatever function you use to fetch docs
  }
  
  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
