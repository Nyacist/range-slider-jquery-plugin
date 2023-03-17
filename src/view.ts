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

    private leftRangePointer: JQuery<HTMLElement>;
    private rightRangePointer: JQuery<HTMLElement>;

    constructor(root: JQuery<HTMLElement>, props: IOptions) {
        this.root = root
        this.controller = new RangeSliderController()
        this.setOptions(props)

        this.leftRangePointer = $('<input type="range" class="range-min">').attr({
            min: props.min,
            max: props.max,
        })
        this.rightRangePointer = $('<input type="range" class="range-max">').attr({
            min: props.min,
            max: props.max,
        })
    }

    private setOptions(props: IOptions) {
        this.controller.handleSetOptions(props)
    }

    private getOptions() {
        //const options = this.controller.handleGetOptions()
        //console.log(options)
        return this.controller.handleGetOptions()   // actual options from model
    }

    public mount() {
        $(this.root).append('<div class="slider"><div class="progress"></div></div>')
        $(this.root).append('<div class="range-input"></div>')
        $(this.root).children('.range-input')
            .append(this.leftRangePointer)
            .append(this.rightRangePointer)

        this.getOptions()
    }

}

