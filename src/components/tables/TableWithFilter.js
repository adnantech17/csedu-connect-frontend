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
  Box,
  Checkbox,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FilterBuilder from './FilterBuilder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './table-pagination.css';
import Loader from '../container/Loader';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  evenRow: {
    backgroundColor: '#e5e5e5', // set a light color for even rows
  },
});

const TableWithFilter = ({
  columns,
  fetchData,
  filterFields,
  forceReload = false,
  onSelectionChange = () => {},
}) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    onSelectionChange(selectedRows);
  }, [selectedRows, onSelectionChange]);

  const classes = useStyles();

  const handleFilterSubmit = (data) => {
    fetch(data);
  };

  const fetch = async (data) => {
    try {
      setLoading(true);
      const res = await fetchData({ page_size: rowsPerPage, page: page + 1, ...data });
      setTableData(res.results);
      setCount(res.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [rowsPerPage, page, forceReload]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Loader isLoading={loading}>
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.length === tableData.length}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedRows(tableData);
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                      indeterminate={
                        selectedRows.length > 0 && selectedRows.length < tableData.length
                      }
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={row.id} className={index % 2 === 0 ? classes.evenRow : ''}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row)}
                        onChange={(event) => {
                          const currentRow = row;
                          setSelectedRows((prevSelectedRows) => {
                            if (prevSelectedRows.includes(currentRow)) {
                              return prevSelectedRows.filter((prevRow) => prevRow !== currentRow);
                            } else {
                              return [...prevSelectedRows, currentRow];
                            }
                          });
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell className="" key={column.id}>
                        {column.render ? column.render(row[column.id], row) : row[column.id] || '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box paddingRight={10}>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="p"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ margin: '16px auto 0' }}
                className="table-pagination"
              />
            </Box>
          </CardContent>
        </Card>
      </Loader>
    </TableContainer>
  );
};

export default TableWithFilter;
