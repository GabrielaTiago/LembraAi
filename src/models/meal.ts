export interface MealProps {
    value: number;
    type: MealType;
}

export enum MealType {
    breakfast = 'Café da manhã',
    lunch = 'Almoço',
    dinner = 'Jantar',
}

export class Meal {
    private props: MealProps;

    get value() {
        return this.props.value;
    }

    get type() {
        return this.props.type;
    }

    constructor(props: MealProps) {
        this.props = props;
    }
}
