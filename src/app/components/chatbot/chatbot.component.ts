import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ChatMessage {
  text: string;
  from: 'user' | 'bot';
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewChecked {
  messages: ChatMessage[] = [
    { text: 'Hello! How can I help you today?', from: 'bot' }
  ];

  userInput: string = '';

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput.trim(), from: 'user' });

    // Fake bot response after a delay
    setTimeout(() => {
      this.messages.push({ text: "I'm a bot 🤖, but still under development. Please come back once I am ready.!", from: 'bot' });
    }, 800);

    this.userInput = '';
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch {}
  }
}
