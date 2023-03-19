export interface IOptions {
    min?: number;
    max?: number;
    type?: string;   // range - for two pointers (default), one - for one pointers
    color?: string;
    position?: string;  // 'horizontally' or 'vertically'
    step?: number;
    leftPointerValue?: number;
    rightPointerValue?: number;
    value?: number;
}

export interface IModel {
    options: IOptions;
}

export class RangeSliderModel implements IModel{
    options: IOptions;
    defaultOptions: IOptions = {
        min: 0,
        max: 100,
        type: 'range', // range - for two pointers (default), one - for one pointers
        color: 'gray',
        position: 'horizontally', // 'horizontally' or 'vertically'
        //this.value = (this.min + this.max)/2
    }

    constructor() {
        this.options = {...this.defaultOptions}
        if ('leftPointerValue' === undefined) this.setValue('leftPointerValue')
        if ('rightPointerValue' === undefined) this.setValue('rightPointerValue')
    }

    private setValue(name: string) {
        if (this.options.min !== undefined && this.options.max !== undefined) {
            switch (name) {
                case 'leftPointerValue': {
                    this.options.leftPointerValue = (this.options?.min + this.options.max)/4
                }
                case 'rightPointerValue': {
                    this.options.rightPointerValue = this.options.max - (this.options.min + this.options.max)/4
                }
                // case 'value': {
                //     this.options.value = (this.options.min + this.options.max)/2
                // }
            }
        }
    }

    getOptions() {
        return this.options
    }

    setOptions(props: IOptions) {
        this.options = {...this.defaultOptions, ...props}
        //console.log(this.options)
    }

}