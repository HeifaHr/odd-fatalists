import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { questions } from '../../assets/questions';
import { QuestionsListService } from '../questions-list.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  questions: Array<Object> = [];
  questionNo: number = 0;
  question: any;
  answers: Array<any> = new Array(5).fill(null); // 5 réponses possibles
  @Output('endQuiz') endQuiz: EventEmitter<any> = new EventEmitter();

  constructor(private QuestionsListService: QuestionsListService) {}

  shuffle(array: Array<Object>) {
    array.sort(() => Math.random() - 0.5);
  }

  ngOnInit(): void {
    this.questions = this.randomQuestions();
    this.question = this.questions[0];
    this.QuestionsListService.setQuestions(this.questions);
  }

  randomQuestions() {
    this.shuffle(questions);
    return questions.slice(0, 5); // Limiter à 5 questions
  }

  setQuestion(queNo: number) {
    this.questionNo = queNo;
    this.question = this.questions[queNo];
  }

  setAnswer(index: number, answer: number) {
    this.answers[index] = answer;
    this.QuestionsListService.setAnswers(this.answers);
  }

  nextQue() {
    if (this.questionNo < 4 && this.answers[this.questionNo] !== null) { // Assurez-vous que la réponse est donnée avant de passer
      this.questionNo += 1;
      this.setQuestion(this.questionNo);
    } else if (this.questionNo === 4) {
      this.submit(); // Soumettre quand 5 questions ont été répondues
    }
  }

  prevQue() {
    if (this.questionNo > 0) {
      this.questionNo -= 1;
      this.setQuestion(this.questionNo);
    }
  }

  clear() {
    this.answers[this.questionNo] = null;
  }

  submit() {
    console.log('Quiz Submitted! Emitting endQuiz event.');
    this.endQuiz.emit(); // Émettre l'événement de fin de quiz
  }
}
