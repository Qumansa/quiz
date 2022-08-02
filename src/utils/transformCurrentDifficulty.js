const transformCurrentDifficulty = (currentDifficulty) => {
    switch(currentDifficulty) {
        case 'Легкий': 
            return 'easy';
        case 'Средний': 
            return 'medium';
        case 'Сложный': 
            return 'hard';
        default:
            return 'easy';
    }
};

export default transformCurrentDifficulty;