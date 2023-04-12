import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FilterBuilder from './FilterBuilder';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  evenRow: {
    backgroundColor: '#e5e5e5', // set a light color for even rows
  },
});

const TableWithFilter = ({ columns, fetchData, filterFields }) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const classes = useStyles();

  const handleFilterSubmit = (data) => {
    console.log(data);
    fetch(data);
  };

  const fetch = async (data) => {
    try {
      const res = await fetchData({ page_size: rowsPerPage, page: page, ...data });
      setTableData(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <TableContainer component={Paper}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filters" id="filters">
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {filterFields && (
            <FilterBuilder filterFields={filterFields} handleFilterSubmit={handleFilterSubmit} />
          )}
        </AccordionDetails>
      </Accordion>
      <Card>
        <CardContent>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.id} className={index % 2 === 0 ? classes.evenRow : ''}>
                  {columns.map((column) => (
                    <TableCell className="text-center" key={column.id}>
                      {row[column.id] || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default TableWithFilter;
