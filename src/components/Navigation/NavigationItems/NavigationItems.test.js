import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe("Navigationitems", () => {

    it("should not render logout items, if user is not authenticated",  () => {
        const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
        expect(wrapper.find(NavigationItem).get(2).props.link).toBe('/auth');
    });

    it("should  render logout items, if user is  authenticated",  () => {
        const wrapper = shallow(<NavigationItems {...{isAuth: true}}/>);
        expect(wrapper.find(NavigationItem).get(2).props.link).toBe('/logout');
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toBe(true);
    });
});
