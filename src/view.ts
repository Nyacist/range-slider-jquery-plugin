import $ from 'jquery';
import {IController, RangeSliderController} from './controller'
import {IOptions} from './model'
import MouseMoveEvent = JQuery.MouseMoveEvent;
import MouseDownEvent = JQuery.MouseDownEvent;
import {makeLogger} from "ts-loader/dist/logger";

interface IThumbOptions {
    positionClass: 'left' | 'right',
    root: JQuery<HTMLElement>
}

class Thumb {
    thumb: JQuery<HTMLElement>
    constructor(props: IThumbOptions) {
        this.thumb = $(`<div class='thumb thumb_${props.positionClass}'></div>`)

        $(this.thumb).on('mousedown', {root: props.root, position: props.positionClass} , this.onMouseDown)
        $(this.thumb).on('dragstart', () => false)

    }

    public onMouseDown = function (e: MouseDownEvent) {
        e.preventDefault()
        const root = e.data.root
        const position = e.data.position

        const onMouseMove = (e: MouseMoveEvent) => {

            let thumbPosition = e.clientX - ($('.slider', root).offset()?.left || 0)
            const sliderWidth = $('.slider', root).width() || 1

            // курсор вышел из слайдера => оставить бегунок в его границах.
            if (thumbPosition < 0) {
                thumbPosition = 0
            }
            if (thumbPosition > sliderWidth) {
                thumbPosition = sliderWidth
            }
            const thumbPercentageValue = Math.round(thumbPosition / sliderWidth * 100)

            if (position == 'left') {
                $('.progress', root).css('left', thumbPercentageValue + '%')
            }
            if (position == 'right') {
                $('.progress', root).css('right', 100 - thumbPercentageValue + '%')
            }
        }

        const onMouseUp = () => {
            $(document).off('mousemove', onMouseMove)
            $(document).off('mouseup', onMouseUp)
        }

        $(document).on('mousemove', onMouseMove)
        $(document).on('mouseup', onMouseUp)

    }

}

export interface View {
    mount: () => void;
    controller: IController;
}

export class RangeSliderView implements View {
    controller: RangeSliderController;
    root: JQuery<HTMLElement>;

    private slider: JQuery<HTMLElement>
    private progressBar: JQuery<HTMLElement>
    private thumbs: [Thumb] | [Thumb, Thumb]

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

        this.thumbs = [new Thumb({
            positionClass: "right",
            root: this.root
        })]

        if (this.type === 'range') {
            this.thumbs.unshift(new Thumb({
                positionClass: "left",
                root: this.root
            }))
        }

        this.setOptions(props)
        this.onClickProgress()
    }

    private setOptions(props: IOptions) {
        this.controller.handleSetOptions(props)
    }

    private getOptions() {
        return this.controller.handleGetOptions()   // actual options from model
    }

    onClickProgress() {
        this.slider.on('click', (e) => {
            const progressBar = $('.progress', this.root)
            const thumbsPosition = []
            thumbsPosition.push(
                +progressBar.css('right').replace(/[^0-9,.]/g, '')
            )
            if (this.type === 'range') {
                thumbsPosition.push(
                    +progressBar.css('left').replace(/[^0-9,.]/g, '')
                )
            }

            const clickPosition = e.clientX - ($('.slider', this.root).offset()?.left || 0)
            const sliderWidth = $('.slider', this.root).width() || 1

            const clickValue = Math.round(clickPosition / sliderWidth * 100)

            const progressBarOffset = thumbsPosition.map((element) => {
                return Math.round(element / sliderWidth * 100)
            })

            const distanceRight = Math.abs(100 - progressBarOffset[0] - clickValue)
            const distanceLeft = Math.abs(progressBarOffset[1] - clickValue)

            if (distanceLeft < distanceRight) {
                progressBar.css('left', clickValue + '%')
            }
            else {
                progressBar.css('right', 100 - clickValue + '%')
            }
        })
    }

    public mount() {
        let progress = this.progressBar
        this.thumbs.forEach((element) => {
            progress.append(element.thumb)
        })
        const slider = this.slider.append(progress)
        $(this.root).append(slider)
    }

}


