import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from './../../components/Burger/BuildControls/BuildControls';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";

configure({adapter: new Adapter()});


describe("BurgerBuilder", () => {

    it("should  render BuildControls , when there are ingredients",  () => {
        const ingredients = {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1
        };
        const wrapper = shallow(<BurgerBuilder ingredients={ingredients} onSetIngredients={()=> {}}/>);

        expect(wrapper.find(BuildControls)).toHaveLength(1);

    });


    it("should not render BuildControls , when there are ingredients",  () => {
        const ingredients = null;
        const wrapper = shallow(<BurgerBuilder ingredients={ingredients} onSetIngredients={()=> {}}/>);

        expect(wrapper.find(BuildControls)).toHaveLength(0);

    });
});
