import React, {useContext} from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { animateScroll as scroll } from 'react-scroll'

export function CustomToggle(props) {    
    const currentEventKey = useContext(AccordionContext);
    const eventKey = props.eventKey;
    const isCurrentEventKey = currentEventKey === eventKey;

    const decoratedOnClick1 = useAccordionToggle(eventKey);

    const decoratedOnClick = (e) => {
        var cardgroup = document.getElementById(props.refgroup);
        var heightbefore = 0;

        var nav = document.getElementById("globalnav");
        var navheight = nav.getBoundingClientRect().height;
        
        if(currentEventKey !== undefined && currentEventKey !== null){
            var activegroup = document.getElementById('card-group-' + currentEventKey);
            var collapse = activegroup.getElementsByClassName('collapse');

            if(props.refgroupid > currentEventKey)
                heightbefore = !isCurrentEventKey ? collapse[0].getBoundingClientRect().height : 0;
        }

        if(!isCurrentEventKey)
            scroll.scrollTo(Math.abs((cardgroup.offsetTop + navheight + 20) - heightbefore));
        
        decoratedOnClick1();
    }  

    return (
        <>
            <div className={isCurrentEventKey ? 'card-header-content active' : 'card-header-content'}
                onClick={decoratedOnClick.bind(this)}>
                <span>{props.children}</span>
            </div>      
        </>
    );
}