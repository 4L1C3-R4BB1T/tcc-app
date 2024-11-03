import { Component, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { ScrollCustomEvent, ViewDidEnter } from '@ionic/angular';
import { Section } from 'src/app/models/sections';
import { SectionService } from './../../../../services/section.service';
import { TrailProgressComponent } from './components/trail-progress/trail-progress.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss'],
})
export class LearnPageComponent implements OnInit, ViewDidEnter  {

  @ViewChildren(TrailProgressComponent)
  listTrailProgress!: QueryList<TrailProgressComponent>;

  scrollChanged = signal(false);
  scrollStart = signal(true);

  section = signal<Section | null>(null);

  currentTitle = signal(this.section()?.units[0].title);

  constructor(readonly sectionService: SectionService, readonly router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.url;
      if (['/tabs/learn'].includes(currentRoute)) {
        this.sectionService.findById(1).subscribe({
          next: (data) => {
            this.section.set(data);
            this.currentTitle.set(this.section()?.units[0].title);
            console.log("Seção carregada...");
          },
          error: (error) => console.error("Erro ao carregar seção:", error)
        });
      }
    });
  }

  // garantir que vai recarregar com os dados atualizados
  ionViewDidEnter(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.url;
      if (['/tabs/learn'].includes(currentRoute)) {
        this.sectionService.findById(1).subscribe({
          next: (data) => {
            this.section.set(data);
            this.currentTitle.set(this.section()?.units[0].title);
            console.log("Seção carregada...");
          },
          error: (error) => console.error("Erro ao carregar seção:", error)
        });
      }
    });
  }

  onScroll(event: ScrollCustomEvent) {
    this.scrollStart.set(event.detail.scrollTop === 0);
    this.scrollChanged.set(true);
    setTimeout(() => this.scrollChanged.set(false), 50);
    this.listTrailProgress?.forEach(item => {
      const { y, height } = item.elementRef.nativeElement.getBoundingClientRect();
      if (Math.abs(y) + (event.detail.scrollTop / 2) < height) {
        this.currentTitle.set(item.title());
      }
    });
  }

}
