import { expect, test } from 'vitest';
import { Meal, MealType } from './meal';

test('Create a meal', () => {
    const meal = new Meal({
        value: 6.1,
        type: MealType.lunch,
    });

    expect(meal).toBeInstanceOf(Meal);
    expect(meal.value).toEqual(6.1);
    expect(meal.type).toEqual(MealType.lunch);
});
