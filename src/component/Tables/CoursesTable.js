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
import { Link } from 'react-router-dom';
import { baseUrl } from '../baseUrl';

function AddInternshipForm(props) {
  const onFinish = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    props.addCourse(formData);
  };



  return (
    <Form onSubmit={onFinish}>
      <Form.Group>
        <Form.Label>Domain</Form.Label>
        <Form.Control required name="domain" type="text" placeholder="ex. Web Dev" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Platform</Form.Label>
        <Form.Control required name="platform" type="text" placeholder="ex. Coursera" />
      </Form.Group>
      <Form.Group>
        <Form.Label>From</Form.Label>
        <Form.Control required name="from" type="date" />
      </Form.Group>
      <Form.Group>
        <Form.Label>To</Form.Label>
        <Form.Control required name="to" type="date" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Certificate</Form.Label>
        <Form.Control required name="certificate" type="file" accept="application/pdf" />
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
          Add Course Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddInternshipForm addCourse = {props.addCourse}/>
      </Modal.Body>
    </Modal>
  );
}

function createData(domain, platform, from, to, certificate) {
  return {
    domain,
    platform,
    from,
    to,
    certificate
  };
}

const options = (studentId, courseId, deleteCourse) => 
<span>
  <Button className="optionView">
  <a target="_blank" href={baseUrl + "students/" + studentId + '/courses/' + courseId}>View</a>
  </Button>
  <Button variant="danger" onClick={() => deleteCourse(courseId)}>Delete</Button>
  </span>;

function loadData(data, studentId, deleteCourse) {
  var rows = [];
  
  // Provide a fallback to an empty array if data is undefined or null
  const safeData = data || [];

  safeData.map((record) => {
    rows.push(createData(record.domain, record.platform, record.from, record.to, options(studentId, record._id, deleteCourse)));
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
    id: "domain",
    numeric: false,
    disablePadding: true,
    label: "Domain"
  },
  {
    id: "platform",
    numeric: true,
    disablePadding: false,
    label: "Platform"
  },
  {
    id: "from",
    numeric: true,
    disablePadding: false,
    label: "From"
  },
  {
    id: "to",
    numeric: true,
    disablePadding: false,
    label: "To"
  },
  {
    id: "certificate",
    numeric: true,
    disablePadding: false,
    label: "Options"
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
        Courses Completed
      </Typography>
    </Toolbar>
  );
};

export default function EnhancedTable(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("platform");
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

  const rows = loadData(props.student.profile.courses, props.student.profile._id, props.deleteCourse);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        {
          props.auth.isTeacher ?
          <div></div>
          :
          <div className="addButton">
          <Button variant="success" onClick={() => setModalShow(true)}>
            Add Record
          </Button>

          <AddInternshipModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            addCourse ={props.addCourse}
          />
        </div>
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
                      key={row.domain}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.domain}
                      </TableCell>
                      <TableCell align="right">{row.platform}</TableCell>
                      <TableCell align="right">{row.from}</TableCell>
                      <TableCell align="right">{row.to}</TableCell>
                      <TableCell align="right">{row.certificate}</TableCell>
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
