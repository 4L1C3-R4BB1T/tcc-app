import { Component } from '@angular/core';
import { UserRanking } from 'src/app/models/user';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss'],
})
export class RankingPageComponent {

  users: UserRanking[] = [
    {
      name: 'Livia',
      exp: 1538
    },
    {
      name: 'Gabriel 1',
      exp: 1537
    },
    {
      name: 'Gabriel 2',
      exp: 1536
    },
    {
      name: 'Gabriel 3',
      exp: 1535
    },
    {
      name: 'Gabriel 4',
      exp: 1534
    },
    {
      name: 'Gabriel 5',
      exp: 1533
    },
    {
      name: 'Gabriel 6',
      exp: 1532
    },
    {
      name: 'Gabriel 7',
      exp: 1531
    },
    {
      name: 'Gabriel 8',
      exp: 1530
    },
    {
      name: 'Gabriel 9',
      exp: 1529
    }
  ];

}
