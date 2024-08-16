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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http} from "@singletons";

@Injectable({
    providedIn: 'root',
})
export class ChatboxService {
    constructor(private http: HttpClient) {}

    private url = 'https://api.openai.com/v1/chat/completions';
    private apiKey = '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';

    postMessage(message: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${this.apiKey}`);

        const body = JSON.stringify({
            model: "gpt-4",
            messages: [{"role": "system", "content": "You help answer questions related to the financial markets, you give short and concise responses."},{ role: "user", content: message }],
            temperature: 0.7,
        });

        return this.http.post(this.url, body, { headers });
    }

}
