export const QuizCalculations = (data) => {
  const calculateScore = (quizId, type) => {
    const filteredData = data.filter(quiz => 
      quiz.quizId === quizId && quiz.quizType === type
    );
    
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce((sum, quiz) => sum + quiz.total, 0);
    return (sum / filteredData.length).toFixed(2);
  };

  return {
    PretestRq29: calculateScore(6, 'PRE'),
    PretestRq20: calculateScore(7, 'PRE'),
    PretestRq3: calculateScore(8, 'PRE'),
    PostRq29: calculateScore(6, 'POST'),
    PostRq20: calculateScore(7, 'POST'),
    PostRq3: calculateScore(8, 'POST'),
  };
};