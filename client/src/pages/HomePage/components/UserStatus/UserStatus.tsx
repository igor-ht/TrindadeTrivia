import './UserStatus.scss';
import categoriesStateVar from '@/apollo/state';
import { useReactiveVar } from '@apollo/client';

export default function UserStatus() {
	const categoriesVar = useReactiveVar(categoriesStateVar);

	const calculateProgress = () => {
		const totalQuestions = categoriesVar.reduce((acc, category) => acc + category.totalQuestions, 0);
		if (!totalQuestions) return '0%';
		const answeredQuestions = categoriesVar.reduce((acc, category) => acc + category.currentQuestion, 0);
		return Math.round((answeredQuestions / totalQuestions) * 100) + '%';
	};

	const calculatePoints = () => {
		const totalPoints = Math.round(categoriesVar.reduce((acc, category) => acc + (category.correctAnswers * 10) / categoriesVar.length, 0));
		return `${totalPoints || 0}/${100}`;
	};

	return (
		<div className="user-status">
			<div className="card">
				<section>
					<h1>Current progress: {calculateProgress()}</h1>
				</section>
				<section>
					<h1>Total Points: {calculatePoints()} </h1>
				</section>
			</div>
		</div>
	);
}
