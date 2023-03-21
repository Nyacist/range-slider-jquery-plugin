import $ from 'jquery';
import {IController, RangeSliderController} from './controller'
import {IOptions} from './model'
import MouseMoveEvent = JQuery.MouseMoveEvent;
import MouseDownEvent = JQuery.MouseDownEvent;
import * as Console from "console";


export interface View {
    mount: () => void;
    controller: IController;
}

export class RangeSliderView implements View {
    controller: RangeSliderController;
    root: JQuery<HTMLElement>;

    private slider: JQuery<HTMLElement>
    private progressBar: JQuery<HTMLElement>
    private thumb: [JQuery<HTMLElement>] | [JQuery<HTMLElement>, JQuery<HTMLElement>]

    type: 'one' | 'range'

    constructor(root: JQuery<HTMLElement>, props: IOptions) {
        this.controller = new RangeSliderController()
        this.root = root

        //костыль, получать из модели
        if (props.type === 'one') {
            this.type = 'one'
        } else {
            this.type = 'range'
        }

        this.slider = $('<div class="slider"></div>')
        this.progressBar = $('<div class="progress"></div>')
        this.thumb = [$('<div class="thumb thumb_right"></div>')]

        if (this.type === 'range') {
            this.thumb.unshift($('<div class="thumb thumb_left"></div>'))
        }

        this.bindListener()

        this.setOptions(props)
    }

    private setOptions(props: IOptions) {
        this.controller.handleSetOptions(props)
    }

    private getOptions() {
        return this.controller.handleGetOptions()   // actual options from model
    }


    // private onMouseDown() {
    //     const slider = $('.slider', this.root)
    //     const progressBar = $('.progress', this.root)

    // const thumb = $('.thumb_left', this.root)
    //
    // thumb.on('mousedown', function (e) {
    //     e.preventDefault()
    //     let shiftX: number
    //     shiftX = e.clientX - ($(this).offset()?.left || 0)
    //     //console.log('shift = ' + shiftX)
    //
    //     $(document).on('mousemove', onMouseMove)
    //     $(document).on('mouseup', onMouseUp)
    //
    //
    //     function onMouseMove(e: MouseMoveEvent) {
    //         console.log(e.target)
    //         if (slider) {
    //             let thumbPosition = e.clientX - shiftX - (slider.offset()?.left || 0)
    //             let sliderWidth = slider.width() || 1
    //
    //             // курсор вышел из слайдера => оставить бегунок в его границах.
    //             if (thumbPosition < 0) {
    //                 thumbPosition = 0
    //             } else if (thumbPosition > sliderWidth) {
    //                 thumbPosition = sliderWidth;
    //             }
    //             let thumbPercentageValue = (thumbPosition / sliderWidth) * 100
    //             //console.log('% = ' + thumbPercentageValue)
    //
    //             if ($(e.target).hasClass('thumb_left')) {
    //                 e.preventDefault()
    //                 progressBar.css('left', thumbPercentageValue + '%')
    //             }
    //             if ($(e.target).hasClass('thumb_right')) {
    //                 e.preventDefault()
    //                 progressBar.css('right', 100 - thumbPercentageValue + '%')
    //             }
    //         }
    //     }
    //
    //     function onMouseUp() {
    //         $(document).off('mouseup', onMouseUp);
    //         $(document).off('mousemove', onMouseMove);
    //     }
    // })
    // thumb.on('dragstart', function () {
    //     return false;
    // });
    //}

    public bindListener() {
        //if (Array.isArray(this.thumb)) {
        $(this.thumb).each((index, element) => {
            $(element).on('mousedown', this.onMouseDown)
            console.log($(element))
            $(element).on('dragstart', () => false)
        })
        //}

        // $(this.thumb[0]).on('mousedown', this.onMouseDown)
        // $(this.thumb[0]).on('dragstart', () => false) //event.stopPropagation()
        //console.log($(this.thumb[0]))

    }

    private onMouseDown = (e: MouseDownEvent) => {
        e.preventDefault()
        $(document).on('mousemove', this.onMouseMove)
        $(document).on('mouseup', this.onMouseUp)
    }

    private onMouseMove = (e: MouseMoveEvent) => {


        let thumbPosition = e.clientX - (this.slider.offset()?.left || 0)
        const sliderWidth = this.slider.width() || 1

        // курсор вышел из слайдера => оставить бегунок в его границах.
        if (thumbPosition < 0) {
            thumbPosition = 0
        }
        if (thumbPosition > sliderWidth) {
            thumbPosition = sliderWidth
        }
        const thumbPercentageValue = (thumbPosition / sliderWidth) * 100
        //console.log('% = ' + thumbPercentageValue)

        //console.log(e.target.classList.contains('thumb_left'))
        if (e.target.classList.contains('thumb_left')) {
            this.progressBar.css('left', Math.round(thumbPercentageValue) + '%')
        }
        if ($(e.target).hasClass('thumb_right')) {
            this.progressBar.css('right', 100 - thumbPercentageValue + '%')
        }
        //this.progressBar.css('right', 100 - thumbPercentageValue + '%')
        //this.progressBar.css('left', thumbPercentageValue + '%')

    }

    private onMouseUp = () => {
        $(document).off('mousemove', this.onMouseMove)
        $(document).off('mouseup', this.onMouseUp)
    }

    public mount() {
        const progress = this.progressBar.append(this.thumb)
        const slider = this.slider.append(progress)
        $(this.root).append(slider)
    }

}


