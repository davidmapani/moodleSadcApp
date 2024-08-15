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
import {  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http} from "@singletons";

@Injectable({
    providedIn: 'root',
})
export class ChatboxService {

    private url = 'https://api.openai.com/v1/chat/completions';
    private apiKey = 'sk-proj-YP7etHBFXOcR5ndJslI9T3BlbkFJseuLONQYFjBE9wrvRlS0';


    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    postMessage(message: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
        });

        const body = {
            'model': 'gpt-4',
            'messages': [{ 'role': 'user', 'content': message }],
            'temperature': 0.7,
        };
        console.log('Headers:', headers);
        console.log('Request Body:', body);
        return Http.post(this.url, body, { headers });
    }

}
