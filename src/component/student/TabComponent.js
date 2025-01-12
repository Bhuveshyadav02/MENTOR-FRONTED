import * as React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Internship from '../Tables/InternshipTable';
import Courses from '../Tables/CoursesTable';
import Absence from '../Tables/MajorAbsenceTable';
import Activity from '../Tables/IndisciplinaryActivityTable';
import LoadingComponent from '../LoadingComponent';
import SemesterComponent from '../Tables/semesterList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function LoadResult(props){
    if(props.result.result != null){
      return(
          <SemesterComponent 
                result = {props.result} 
                student = {props.student}
                addResult = {props.addResult}
                editResult = {props.editResult}
                deleteResult = {props.deleteResult}
                auth = {props.auth}
          />
      );
    }
    else if (props.result.errMess) {
      return (
        <h2>{props.result.errMess}</h2>
      );
    }
    else {
      return (
        <LoadingComponent />
      );
    }
}

export default function BasicTabs(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1, bgcolor: 'background.paper' }}>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
        >
          <Tab label="Internships" {...a11yProps(0)} />
          <Tab label="Courses" {...a11yProps(1)} />
          <Tab label="Semester Details" {...a11yProps(2)} />
          <Tab label="Major Absence" {...a11yProps(3)} />
          <Tab label="InDisciplinary Activities" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Internship 
            student = {props.student} 
            addInternship = {props.addInternship} 
            deleteInternship = {props.deleteInternship}
            auth={props.auth}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Courses 
          student = {props.student} 
          addCourse = {props.addCourse}
          deleteCourse = {props.deleteCourse}
          auth={props.auth}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
            <LoadResult 
                result = {props.result}
                student = {props.student} 
                addResult = {props.addResult}
                editResult = {props.editResult}
                deleteResult = {props.deleteResult}
                auth={props.auth}
            />
      </TabPanel>
      <TabPanel value={value} index={3}>
          <Absence 
            student = {props.student} 
            addAbsence = {props.addAbsence} 
            deleteAbsence = {props.deleteAbsence}
            auth={props.auth}
          />
      </TabPanel>
      <TabPanel value={value} index={4}>
          <Activity 
              student = {props.student}
              addActivity = {props.addActivity}
              deleteActivity = {props.deleteActivity}
              auth={props.auth}
          />
      </TabPanel>
    </div>
  );
}