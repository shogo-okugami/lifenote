import React from 'react';
import useCalendar from './useCalendar';
import MonthMenu from '../MonthMenu/MonthMenu'
import YearSwitch from '../YearSwitch/YearSwitch'
import DialryForm from '../../Form/DialryForm/DialryForm'
import Note from '../../Note/Note/Note'
import { asset, getClassName, getDark } from '../../../functions';

const Calendar = ({ notes: index, errors, date: defaultDate }) => {

    const { year, month, userId, isDark, csrf, mediaScreenL, body, setCalendar, handleClick, note, inputDateValue } = useCalendar(index, defaultDate)

    return (
        <div className={'p-calendar' + getDark(isDark) + getClassName(mediaScreenL, 'u-flex')}>
            <div className='p-calendar__body'>
                <div className="p-calendar__heading">
                    <div className="p-calendar__switch--prev"><img onClick={() => handleClick('prev')} src={asset('/images/nav-left.svg', isDark)} /></div>
                    <MonthMenu userId={userId} year={year} month={month} setCalendar={setCalendar} />
                    {mediaScreenL ? <YearSwitch userId={userId} year={year} month={month} setCalendar={setCalendar} /> : <div>{year}</div>}
                    <div className="p-calendar__switch--next"><img onClick={() => handleClick('next')} src={asset('/images/nav-right.svg', isDark)} /></div>
                </div>
                <table>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
            {mediaScreenL ? note.exists ? <Note flag={true} note={note.note} csrf={csrf} mediaScreenL={mediaScreenL} isDark={isDark} /> : <DialryForm flag={true} errors={errors} userId={userId} csrf={csrf} date={inputDateValue} mediaScreenL={mediaScreenL} isDark={isDark} /> : ''}
        </div>
    );
}

export default Calendar

