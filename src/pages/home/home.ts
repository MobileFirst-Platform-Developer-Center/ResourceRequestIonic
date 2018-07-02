/**
 * Copyright 2018 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  first : string;
  middle: string;
  last : string;
  age: string;
  height : string;
  birthdate: string;

  constructor(public navCtrl: NavController) {
  }

  submitRequest() {
    //JavaAdapter expects first, middle and last to be part of the POST URL path.
    var url: string = "/adapters/JavaAdapter/users/"+ this.first +"/"+ this.middle +"/"+ this.last;
    var resourceRequest = new WLResourceRequest(url, WLResourceRequest.POST);

    //JavaAdapter expects age to be a query parameter.
    resourceRequest.setQueryParameter("age", this.age);

    //JavaAdapter expects birthdate to be a header parameter.
    resourceRequest.setHeader("birthdate", this.birthdate);

    //JavaAdapter expects height to be a form parameter.
    var formParameters = {height: this.height};
    
    resourceRequest.sendFormParameters(formParameters).then(
      (response) => {
        WL.Logger.info("Success " + response.responseText);
        var resultText = "<b> Success </b>" + "<br/>";
        resultText += "Name: ";
        resultText += response.responseJSON.first + " " + response.responseJSON.middle + " " + response.responseJSON.last + "<br>";
        resultText += "Age: " + response.responseJSON.age + "<br/>";
        resultText += "Height: " + response.responseJSON.height + "<br/>";
        resultText += "Birthdate: " + response.responseJSON.birthdate + "<br/>";
        document.getElementById("div_result").innerHTML= resultText;
      }, (error) => {
        WL.Logger.info("Failure: " + JSON.stringify(error));
        var resultText = "Failure: " + JSON.stringify(error);
        document.getElementById("div_result").innerHTML = resultText;
      }
    );
  }

}
