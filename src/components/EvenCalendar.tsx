import React, {FC} from 'react';
import {Badge, Calendar} from "antd";
import {Moment} from "moment";
import {IEvent} from "../model/IEvent";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EvenCalendar: FC<EventCalendarProps> = (props) => {

    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate())
        const currentDayEvent = props.events.filter(ev => ev.date === formatedDate)
        return (
            <ul>
                {currentDayEvent.map((ev, index) =>
                        <li key={index}>
                            {ev.description}
                        </li>
                )}
            </ul>
        );
    }

    return (
        <Calendar dateCellRender={dateCellRender} />
    );
};

export default EvenCalendar;