import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatboxService } from '@addons/messages/services/chatbox';

@Component({
    selector: 'page-addon-messages-chatbox',
    templateUrl: 'chatbox.html',
    styleUrls: ['./chatbot.scss'],
})
export class ChatboxPage {
    @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;

    messages: { text: string; role: string; content?: string }[] = [];
    newMessage = '';
    loading = false;
    errorMessage: string | null = null;
    initialLoad = true;
    previousScrollHeight = 0;

    constructor(private chatboxService: ChatboxService) {}

    async sendMessage() {
        const msg = this.newMessage.trim();
        this.newMessage = '';
        this.errorMessage = null;

        if (msg !== '') {
            this.messages.push({ text: msg, role: 'user' });
            // this.scrollToBottom(); // Scroll to the latest message
            this.loading = true;

            // Set a fail-safe timeout to hide the spinner after a certain time
            const timeoutId = setTimeout(() => {
                this.loading = false;
            }, 10000); // 10 seconds

            this.chatboxService.postMessage(msg).subscribe(
                (response: any) => {
                    clearTimeout(timeoutId); // Clear the timeout if a response is received
                    const chatResponse = response.choices?.[0]?.message?.content;
                    if (chatResponse) {
                        this.messages.push({ text: '', role: 'assistant', content: chatResponse });
                    } else {
                        this.errorMessage = 'No response content available.';
                    }
                    this.loading = false;
                    // this.scrollToBottom(); // Scroll to the latest message
                },
                (error: any) => {
                    clearTimeout(timeoutId); // Clear the timeout if an error occurs
                    this.errorMessage = error.message || 'An error occurred while processing your request.';
                    console.error('Failed to fetch response from Chat-GPT API:', error);
                    this.loading = false;
                    // this.scrollToBottom(); // Scroll to the latest message
                },
            );
        }
    }


    // scrollToBottom() {
    //     setTimeout(() => {
    //         this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    //     }, 100);
    // }

    // onScroll(event: any) {
    //     const scrollTop = event.target.scrollTop;
    //     if (scrollTop === 0 && !this.loading) {
    //         this.loadPreviousMessages();
    //     }
    // }
    //
    // loadPreviousMessages() {
    //     this.loading = true;
    //
    //     // Simulate loading previous messages
    //     setTimeout(() => {
    //         const previousMessages = [
    //             { text: 'This is an older message', role: 'assistant' },
    //             { text: 'Here is another older message', role: 'user' },
    //         ];
    //
    //         this.previousScrollHeight = this.chatContainer.nativeElement.scrollHeight;
    //
    //         this.messages.unshift(...previousMessages);
    //
    //         this.loading = false;
    //         this.restoreScrollPosition();
    //     }, 1000);
    // }
    //
    // restoreScrollPosition() {
    //     setTimeout(() => {
    //         const currentScrollHeight = this.chatContainer.nativeElement.scrollHeight;
    //         const newScrollTop = currentScrollHeight - this.previousScrollHeight;
    //         this.chatContainer.nativeElement.scrollTop = newScrollTop;
    //     }, 100);
    // }

    ionViewDidEnter() {
        if (this.initialLoad) {
            // this.scrollToBottom();
            this.initialLoad = false;
        }
    }
}
