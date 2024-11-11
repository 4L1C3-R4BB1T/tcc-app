import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { Howl } from 'howler';

@Component({
  selector: 'app-challenge-fail-page',
  templateUrl: './challenge-fail-page.component.html',
  styleUrls: ['./challenge-fail-page.component.scss'],
})
export class ChallengeFailPageComponent implements ViewDidEnter {

  loseGameSound = new Howl({ src: ['assets/sounds/lose.wav'], volume: 0.3 });

  ionViewDidEnter() {
    this.loseGameSound.play();
  }

}
