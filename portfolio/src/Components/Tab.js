import React, { Component } from 'react'
import { Link, Route, Switch } from "react-router-dom";

export default class Tab extends Component {
    addStyling = () => {
        if(this.props.tab.id === this.props.activeTab){
            return {color: 'rgb(143, 143, 143)'}
        }
        else{
            return {color: '#EA5E76'}
        }
    }
    render() {
        return (
            <Link to={`/${this.props.tab.title}`} className ='tab' style={this.addStyling()} onClick={this.props.changeTab.bind(this, this.props.tab.id)}>{this.props.tab.title}</Link>
        )
    }
}
