// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { Component } from '@angular/core';
import { ChatboxService } from '@addons/messages/services/chatbox';
import { Subscription } from 'rxjs';

@Component({
    selector: 'page-addon-messages-chatbox',
    templateUrl: 'chatbox.html',
    styleUrls: [
        './chatbot.scss',
    ],
})
export class ChatboxPage {

    messages: { text: string; role: string; content?: string }[] = [];
    newMessage = '';

    constructor(private chatboxService: ChatboxService) {}

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async sendMessage() {
        const msg = this.newMessage.trim();
        this.newMessage = '';

        if (msg !== '') {
            this.messages.push({ text: msg, role: 'user' });

            this.chatboxService.postMessage(msg).subscribe(
                (response: any) => {
                    const chatResponse = response.choices[0].message.content;
                    this.messages.push({ text: '', role: 'assistant', content: chatResponse });
                },
                (error: any) => {
                    // eslint-disable-next-line no-console
                    console.error('Failed to fetch response from Chat-GPT API:', error);
                },
            );
        }
    }

}

