export function roundNumberString(score: number) {
	if (!score) return 0;
	if (score < 1e3) return score.toString();
	if (score < 3e4) return `${(score / 1e3).toFixed(1)}k`;
	if (score < 1e6) return `${Math.round(score / 1e3)}k`;
	return Math.round(score / 1e6);
}
