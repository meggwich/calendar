import './App.css';
import moment from 'moment';
moment.locale('ru');
import PropTypes from 'prop-types';


const Calendar = ({ date }) => {
  const currentDate = moment(date);
  
  const generateCalendar = () => {
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    
    const startWeek = startOfMonth.clone().startOf('week').isoWeekday(1);
    const endWeek = endOfMonth.clone().endOf('week').isoWeekday(7);

    const calendar = [];
    let day = startWeek.clone();

    while (day.isBefore(endWeek) || day.isSame(endWeek, 'day')) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push({
          date: day.clone(),
          isCurrentMonth: day.isSame(currentDate, 'month'),
          isToday: day.isSame(moment(date), 'day')
        });
        day.add(1, 'day');
      }
      calendar.push(week);
    }
    
    return calendar;
  };

  const calendarWeeks = generateCalendar();

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {currentDate.format('dddd')}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">
            {currentDate.format('D')}
          </div>
          <div className="ui-datepicker-material-month">
            {currentDate.format('MMMM')}
          </div>
          <div className="ui-datepicker-material-year">
            {currentDate.format('YYYY')}
          </div>
        </div>
      </div>
      
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {currentDate.format('MMMM')}
          </span>&nbsp;
          <span className="ui-datepicker-year">
            {currentDate.format('YYYY')}
          </span>
        </div>
      </div>
      
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {[...Array(7)].map((_, i) => (
              <th key={i} scope="col" title={moment().isoWeekday(i+1).format('dddd')}>
                {moment().isoWeekday(i + 1).format('dd')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                const className = [
                  !day.isCurrentMonth && 'ui-datepicker-other-month',
                  day.isToday && 'ui-datepicker-today'
                ].filter(Boolean).join(' ');
                
                return (
                  <td key={dayIndex} className={className || undefined}>
                    {day.date.format('D')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

const now = new Date(2017, 2, 8);

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;

