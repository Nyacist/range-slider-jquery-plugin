import $ from 'jquery';
import jQuery from 'jquery';
import './style.scss';
import {RangeSliderView} from './view';
import {IOptions} from './model'
import MouseDownEvent = JQuery.MouseDownEvent;

$(function () {
    // let rangeInputs = $('.range-input input')
    // let priceInputs = $('.price-input input')
    // const progress = $('.slider .progress')
    // const gap = 1000

    // priceInputs.each(function() {
    //     this.addEventListener("input", (e) => {
    //         let leftInputValue = +($(priceInputs[0]).val() ?? 0)
    //         let rightInputValue = +($(priceInputs[1]).val() ?? 0)
    //
    //         let leftMaxValue = +($(rangeInputs[0]).attr('max') ?? 1)
    //         let rightMaxValue = +($(rangeInputs[1]).attr('max') ?? 1)
    //
    //         if (rightInputValue - leftInputValue >= gap && rightInputValue <= rightMaxValue){
    //             if ((e.target as HTMLElement).className === 'input-min') {
    //                 $(rangeInputs[0]).val(leftInputValue)
    //                 progress.css('left', (leftInputValue / leftMaxValue * 100) + '%')
    //             } else if ((e.target as HTMLElement).className === 'input-max'){
    //                 $(rangeInputs[1]).val(rightInputValue)
    //                 progress.css('right', (100 - (rightInputValue / rightMaxValue * 100)) + '%')
    //             }
    //         }
    //     })
    // })

    // rangeInputs.each(function() {
    //     this.addEventListener("input", (e) => {
    //         let leftValue = +($(rangeInputs[0]).val() ?? 0)
    //         let rightValue = +($(rangeInputs[1]).val() ?? 0)
    //
    //         let leftMaxValue = +($(rangeInputs[0]).attr('max') ?? 1)
    //         let rightMaxValue = +($(rangeInputs[1]).attr('max') ?? 1)
    //
    //         if (rightValue - leftValue < gap){
    //             if ((e.target as HTMLElement).className === 'range-min') {
    //                 $(rangeInputs[0]).val(rightValue - gap)
    //             } else if ((e.target as HTMLElement).className === 'range-max'){
    //                 $(rangeInputs[1]).val(leftValue + gap)
    //             }
    //         } else {
    //             // $(priceInputs[0]).val(leftValue)
    //             // $(priceInputs[1]).val(rightValue)
    //             progress.css('left', (leftValue / leftMaxValue * 100) + '%')
    //             progress.css('right', (100 - (rightValue / rightMaxValue * 100)) + '%')
    //         }
    //     })
    // })

});

declare global {
    interface JQuery {
        myPlugin({}: IOptions): void
    }
}

(function ( $ ) {

    $.fn.myPlugin = function(props: IOptions) {
        const rangeView = new RangeSliderView(this, props);
        rangeView.mount();
    }

})( jQuery );

$('#root').myPlugin({
    max: 1000,
    min: 100,
    type: 'range',
})

$('#root2').myPlugin({
    max: 1000,
    min: 100,
    type: 'one',
})

// const slider = document.querySelector<HTMLElement>('#slider');
// const thumb = document.querySelector<HTMLElement>('.thumb');
//
// if (thumb && slider) {
//     thumb.onmousedown = function(event) {
//         event.preventDefault(); // предотвратить запуск выделения (действие браузера)
//
//         let shiftX = event.clientX - thumb.getBoundingClientRect().left;
//         // shiftY здесь не нужен, слайдер двигается только по горизонтали
//
//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//         //console.log(event)
//
//         function onMouseMove(event: any) {
//             if (thumb && slider) {
//                 let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
//
//                 // курсор вышел из слайдера => оставить бегунок в его границах.
//                 if (newLeft < 0) {
//                     newLeft = 0;
//                 }
//                 let rightEdge = slider.offsetWidth - thumb.offsetWidth;
//                 if (newLeft > rightEdge) {
//                     newLeft = rightEdge;
//                 }
//
//                 thumb.style.left = newLeft + 'px';
//             }
//         }
//
//         function onMouseUp() {
//             document.removeEventListener('mouseup', onMouseUp);
//             document.removeEventListener('mousemove', onMouseMove);
//         }
//
//     };
//
//     thumb.addEventListener('dragstart', function() {
//         return false;
//     });
// }


