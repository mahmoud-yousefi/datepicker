import React from 'react';
import './App.css';
import MyDatePicker from './MyDatePicker/MyDatePicker'
import DatePicker from './DatePicker';
import Calendar from './Calendar';
// import moment from 'moment';
// function onChange(timestamp) {
//   console.log(timestamp);
// }
function App() {
  return (
      <div className="App">
          {/* <MyDatePicker onChange={onChange}/> */}
          {/* <DatePicker/> */}
          <Calendar/>

      </div>
  );
}

export default App;
