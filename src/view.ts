import $ from 'jquery';
import {IController, RangeSliderController} from './controller'
import {IOptions} from './model'


export interface View {
    mount: () => void;
    controller: IController;
}

export class RangeSliderView implements View {
    controller: RangeSliderController;
    root: JQuery<HTMLElement>;

    constructor(root: JQuery<HTMLElement>, props: IOptions) {
        this.root = root
        this.controller = new RangeSliderController()
        this.setOptions(props)
    }

    private setOptions(props: IOptions) {
        this.controller.handleSetOptions(props)
    }

    private getOptions() {
        return this.controller.handleGetOptions()   // actual options from model
    }

    createRangeInputs() {
        const options = this.getOptions()
        if (options.type == 'range') {
            const leftRangePointer = $('<input type="range" class="range-min">').attr({
                min: options.min,
                max: options.max,
                value: options.leftPointerValue,
            })
            const rightRangePointer = $('<input type="range" class="range-max">').attr({
                min: options.min,
                max: options.max,
                value: options.rightPointerValue,
            })
            return $('<div class="range-input"></div>').append(leftRangePointer).append(rightRangePointer)
        }
    }

    public mount() {

        $(this.root).append('<div class="slider"><div class="progress"></div></div>')
        $(this.root).append('<div class="range-input"></div>')

        const a = this.createRangeInputs()
        $(this.root).append()
        console.log(a)
            // .append(this.leftRangePointer)
            // .append(this.rightRangePointer)


    }

}

