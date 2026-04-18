import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  selector: 'app-root',
  template: `
    <button [disabled]="topics().length <= 0" (click)="openTopicModal()">
      Open Topic
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics: Signal<TopicType[]> = toSignal(
    this.topicService.fakeGetHttpTopic().pipe(take(1)),
    { initialValue: [] },
  );

  openTopicModal() {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics: this.topics(),
      },
    });
  }
}
