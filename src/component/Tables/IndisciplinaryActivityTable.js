import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AddInternshipForm(props) {
  const onFinish = e => {
    e.preventDefault();
    const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
    props.addActivity(props.studentId, formDataObj);
  };

  return (
        <Form onSubmit={onFinish}>
            <Form.Group>
              <Form.Label>Activity</Form.Label>
              <Form.Control required name="activity" type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control required name="date" type="date"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Punishment</Form.Label>
              <Form.Control required name='punishment' type="text"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Remark</Form.Label>
              <Form.Control required name="remark" type="text" placeholder="ex. Web Dev" />
            </Form.Group>
            <Form.Group>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: "10px" }}>
                Submit
                </Button>
            </Form.Group>
          </Form>
  )
}

function AddInternshipModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Indisciplinary Activity Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddInternshipForm addActivity = {props.addActivity} studentId = {props.studentId}/>
      </Modal.Body>
    </Modal>
  );
}

function createData(activity, date, punishment, remark, button) {
  return {
    activity,
    date,
    punishment,
    remark,
    button
  };
}

const options = (studentId, absenceId, deleteActivity) => <Button variant="danger" onClick={() => deleteActivity(studentId, absenceId)}>Delete</Button>;

function loadData(data, studentId, deleteActivity) {
  var rows = [];
  data.map((record) => {
    rows.push(createData(record.activity, record.date, record.punishment, record.remark, options(studentId, record._id, deleteActivity)));
  });
  return rows;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "activity",
    numeric: false,
    disablePadding: true,
    label: "Activity"
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date"
  },
  {
    id: "punishment",
    numeric: true,
    disablePadding: false,
    label: "Punishment"
  },
  {
    id: "remark",
    numeric: true,
    disablePadding: false,
    label: "Remark"
  },
  {
    id: "button",
    numeric: true,
    disablePadding: false,
    label: "Remove Record"
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Indisciplinary Activities
      </Typography>
    </Toolbar>
  );
};

export default function EnhancedTable(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const rows = loadData(props.student.profile.disciplinary, props.student.profile._id, props.deleteActivity)
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        {
          props.auth.isTeacher ?
          <div  className="addButton">
                <Button variant="success" onClick={() => setModalShow(true)}>
                    Add Record
                </Button>

                <AddInternshipModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    addActivity = {props.addActivity}
                    studentId = {props.student.profile._id}
                />
            </div>
          :
          <div></div>
        }
            
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.activity}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.activity}
                      </TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.punishment}</TableCell>
                      <TableCell align="right">{row.remark}</TableCell>
                      <TableCell align="right">{row.button}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
