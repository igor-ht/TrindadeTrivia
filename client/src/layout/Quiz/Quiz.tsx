import './Quiz.scss';
import categoriesStateVar from '@/apollo/state';
import { useHandleCurrentQuestion } from '@/utils/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type QuizProps = {
	id: string;
};

type CurrentAnswer = {
	answer: string;
	status: 'idle' | 'correct' | 'incorrect';
};

export default function Quiz(props: QuizProps) {
	const categoriesState = categoriesStateVar();
	const currentCategory = categoriesState.find((category) => category.id === props.id);
	const currentQuestionIndex = ((currentCategory?.currentQuestion || 0) + 1).toString() || '1';

	const [currentAnswer, setCurrentAnswer] = useState<CurrentAnswer>({ answer: '', status: 'idle' });
	const { loading, error, currentQuestion, getCorrectAnswer, correctAnswer } = useHandleCurrentQuestion(props.id, currentQuestionIndex);

	const handleCurrentAnswer = (answer: string) => {
		if (currentAnswer.status !== 'idle') return;
		setCurrentAnswer({ answer: answer, status: 'idle' });
	};

	const handleQuestionAnswered = async () => {
		if (currentAnswer.status !== 'idle') return;

		const res = await getCorrectAnswer({
			variables: { categoryId: props.id, questionId: currentQuestion?.id || '1' },
		});
		if (res) {
			const isCorrect = res.data?.category.question.correctAnswer === currentAnswer.answer;
			setCurrentAnswer({ answer: currentAnswer.answer, status: isCorrect ? 'correct' : 'incorrect' });
		}
	};

	const updateLocalStateVar = async () => {
		categoriesStateVar(
			categoriesState.map((category) => {
				if (category.id === props.id) {
					return {
						...category,
						currentQuestion: category.currentQuestion! + 1,
						correctAnswers: (currentAnswer.status === 'correct' ? 1 : 0) + category.correctAnswers!,
					};
				}
				return category;
			})
		);
	};

	const handleNextQuestion = async () => {
		await updateLocalStateVar();
		setCurrentAnswer({ answer: '', status: 'idle' });
	};

	if (loading) {
		return (
			<div className="quiz-container">
				<p className="loading">Loading...</p>
			</div>
		);
	}

	if (error && (currentCategory?.currentQuestion || 0) !== (currentCategory?.totalQuestions || 0)) {
		return (
			<div className="quiz-container">
				<p className="error">Error: {error.message}</p>
			</div>
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
	if (!currentQuestion || currentCategory?.currentQuestion! >= currentCategory?.totalQuestions!)
		return (
			<div className="quiz-container">
				<div className="quiz-complete">
					<p>Quizz is complete!</p>
					<p>
						You got {currentCategory?.correctAnswers} correct answers from a total of {currentCategory?.totalQuestions} questions.
					</p>
					<Link to="/">
						<button type="button">Back to Home</button>
					</Link>
				</div>
			</div>
		);

	return (
		<div className="quiz-container">
			<div className="current-question">
				<p className="question">
					{currentQuestion.id}. Question: {currentQuestion.question}
				</p>
				<ul>
					{currentQuestion.answers.map((answer, i) => {
						if (answer) {
							const classAnswer =
								answer === correctAnswer && currentAnswer.status !== 'idle'
									? 'correct'
									: answer === currentAnswer.answer && currentAnswer.status === 'idle'
									? 'selected'
									: answer === currentAnswer.answer && currentAnswer.status === 'incorrect'
									? 'incorrect'
									: '';
							return (
								<li
									className={classAnswer}
									onClick={() => handleCurrentAnswer(answer)}
									key={i}>
									{answer}
								</li>
							);
						}
					})}
				</ul>
				<section className="button-section">
					<button
						className="check-answer-button"
						type="button"
						onClick={handleQuestionAnswered}
						disabled={!currentAnswer.answer}>
						Check answer
					</button>
					<button
						type="button"
						className="next-question-button"
						onClick={handleNextQuestion}
						disabled={currentAnswer.status === 'idle'}>
						Next question
					</button>
				</section>
			</div>
		</div>
	);
}
