import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../screen.service';
import { QuizComponent } from "../quiz/quiz.component";
import { ResultComponent } from "../result/result.component";
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-quiz',
  standalone: true,
  imports: [CommonModule, QuizComponent, ResultComponent, NavBarComponent, FooterComponent],
  templateUrl: './main-quiz.component.html',
  styleUrl: './main-quiz.component.scss'
})
export class MainQuizComponent {
  title = 'quiz-app';
  screen: number = 1;

  constructor(private ScreenService: ScreenService) {}

  ngOnint() {
    this.screen = this.ScreenService.getScreen();
  }
  changeScreen(screenNo: number) {
    this.ScreenService.setScreen(screenNo);
    this.screen = screenNo;
  }
  endQuiz() {
    console.log('End Quiz event received! Switching to Result screen.');
  this.changeScreen(3); 
} 
}
