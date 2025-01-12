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

function AddSemesterForm(props) {
    const onFinish = e => {
        e.preventDefault();
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);
        props.addResult(formDataObj);
      };
  
    return (
            <Form
                onSubmit={onFinish}
            > 
          <p style={{color: "red"}}>PLEASE ENTER DETAILS ONLY WHICH ARE AVAILABLE</p>
              <Form.Group>
                <Form.Label>Semester</Form.Label>
                <Form.Select required name="sem" aria-label="Default select example">
                  <option>-</option>
                  <option value="1">Odd</option>
                  <option value="2">Even</option>
                  <option value="3">Makeup</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control required name="year" type="number" min="1" max="5" />
              </Form.Group>
              <Form.Group>
                <Form.Label>CGPA</Form.Label>
                <Form.Control name="cgpa" type="number" min="0" max="10" step = "0.01"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>SGPA</Form.Label>
                <Form.Control name="sgpa" type="number" min="0" max="10" step = "0.01"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Credits Earned</Form.Label>
                <Form.Control name="creditsEarned" type="number" min="0" max="30 "/>
              </Form.Group>
              <Form.Group>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginTop: "10px" }}>
                    Submit
                    </Button>
                </Form.Group>
            </Form>
    )
}
  
function AddSemesterModal(props) {
return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Add Semester
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <AddSemesterForm addResult = {props.addResult}/>
    </Modal.Body>
    </Modal>
);
}

function createData(sem, year, cgpa, sgpa, credits, optons) {
  if(sem == 1){
    sem = "Odd"
  }
  else if( sem == 2){
    sem = "Even"
  }
  else if(sem ==3) {
    sem = "Makeup"
  }
  return {
    sem,
    year,
    cgpa,
    sgpa,
    credits,
    optons
  };
}

const options = (studentId, resultId, deleteResult) => <span><Button className="optionView"><Link to={"/student/" + studentId + "/result/"+ resultId}>View</Link></Button><Button variant="danger" onClick = {() => deleteResult(resultId)}>Delete</Button></span>;

function loadData(data, studentId, deleteResult) {
  var rows = [];
  data.map((record) => {
    rows.push(createData(record.sem, record.year, record.cgpa, record.sgpa, record.creditsEarned, options(studentId, record._id, deleteResult)));
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
    id: "sem",
    numeric: false,
    disablePadding: true,
    label: "Sem"
  },
  {
    id: "year",
    numeric: true,
    disablePadding: false,
    label: "Year"
  },
  {
    id: "cgpa",
    numeric: true,
    disablePadding: false,
    label: "CGPA"
  },
  {
    id: "sgpa",
    numeric: true,
    disablePadding: false,
    label: "SGPA"
  },
  {
    id: "credits",
    numeric: true,
    disablePadding: false,
    label: "Credits"
  },
  {
    id: "optons",
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
        Semester List
      </Typography>
    </Toolbar>
  );
};

export default function EnhancedTable(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("year");
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
  const rows = loadData(props.result.result, props.student.profile._id, props.deleteResult)
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
          <div  className="addButton">
              <Button variant="success" onClick={() => setModalShow(true)}>
                  Add Semester
              </Button>
  
              <AddSemesterModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  addResult = {props.addResult}
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
                      key={row.sem}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.sem}
                      </TableCell>
                      <TableCell align="right">{row.year}</TableCell>
                      <TableCell align="right">{row.cgpa}</TableCell>
                      <TableCell align="right">{row.sgpa}</TableCell>
                      <TableCell align="right">{row.credits}</TableCell>
                      <TableCell align="right">{row.optons}</TableCell>
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
