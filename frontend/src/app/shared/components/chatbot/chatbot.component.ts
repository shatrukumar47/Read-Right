import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit {
  showChatbot: boolean = false;
  messages: { text: string; from: 'user' | 'bot' }[] = [];
  userMessage: string = '';
  loading: boolean = false;
  books: any = [];

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    // this.callChatBotAPI();
    this.scrollToBottom();
  }

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.userMessage.trim() === '') {
      return;
    }

    // User message
    this.messages.push({ text: this.userMessage, from: 'user' });
    this.callChatBotAPI();
    this.userMessage = '';
    this.scrollToBottom();
  }

  // Function to scroll to the bottom of the chat container
  scrollToBottom() {
    const chatContainer = document.getElementById('chatMessages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  //Function to call chatBotAPI
  callChatBotAPI() {
    this.loading = true;
    this.chatbotService.sendMessageToChatAPI(this.userMessage).subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res) && res.length !== 0) {
          this.books = res;
          this.messages.push({
            text: 'Here are some suggestions:',
            from: 'bot',
          });
        } else {
          this.messages.push({ text: res.response, from: 'bot' });
          this.books = [];
        }
        this.loading = false;
        this.userMessage = '';
        this.scrollToBottom();
      },
      (error) => {
        console.error('Error:', error);
        this.messages.push({
          text: "I apologize for the inconvenience. It seems that we're experiencing some technical difficulties at the moment.",
          from: 'bot',
        });
        this.books = [];
        this.loading = false;
      }
    );
  }
}
