import {IOptions, IModel, RangeSliderModel} from './model'

export interface IController {
    model: IModel;
}

export class RangeSliderController implements IController{
    model: RangeSliderModel;

    constructor() {
        this.model = new RangeSliderModel();
    }

    public handleGetOptions() {
        return this.model.getOptions()
    }

    public handleSetOptions(props: IOptions) {
        this.model.setOptions(props)
    }
}