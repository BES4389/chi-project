import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import localCars from './cars.json'
import { ModalDelete, ModalForm } from './Modals'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import'./../App.css';
const baseUrl = "https://myfakeapi.com/api/cars/";


export default function CarTable() {
  const [data, setData] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
      return;
    }
    axios.get(baseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error while fetching data');
        }
        return response.json();
      })
      .then((data) => {
        const carsData = data.cars.map((car) => ({
          ...car,
          availability: car.availability ? 'YES ' : 'NO'
        }));
        setData(carsData);
        localStorage.setItem('myData', JSON.stringify(carsData));
      })
      .catch(error => {
        const carsData = localCars.map((car) => ({
          ...car,
          availability: car.availability ? 'YES ' : 'NO'
        }))
        //Api was dying at late night that`s why local Cars was added
        setData(carsData)
        console.error('Error fetching data:', error);
      })
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'car', headerName: 'Car mark', width: 200 },
    { field: 'car_model', headerName: 'Car model', width: 200 },
    { field: 'car_vin', headerName: 'VIN', width: 200 },
    { field: 'car_color', headerName: 'Color', width: 200 },
    { field: 'car_model_year', headerName: 'Model year', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'availability', headerName: 'Availability', width: 200 },
    {
      field: 'actions', headerName: ' Actions', width: 200,
      renderCell: (params) => (
        <div >
          <Button
            sx={{ color: "white", backgroundColor: "#7B68EE", }}
            onClick={() => handleEditClick(params.row)}>
            Edit
          </Button>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#B22222",
              margin: "10px"
            }}
            onClick={() => handleDeleteClick(params.row)}>
            Delete
          </Button>
        </div>
      )
    }


  ];
  const handleCreateNewRow = () => {
    setIsModalFormOpen(true)
  }

  const handleDeleteConfirm = () => {
    const updatedData = data.filter((el) => el.id !== selectedRow.id)
    console.log(updatedData);
    setData(updatedData)
    setIsDeleteModal(false)
    localStorage.setItem("myData", JSON.stringify(updatedData))
  }

  const handleDeleteClick = (value) => {
    setSelectedRow(value)
    console.log(value);
    setIsDeleteModal(true);
  }

  const handleDeleteClose = () => {
    setIsDeleteModal(false);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedData = isEditMode ? data.map((el) => (el.id === selectedRow.id ? { ...el, ...selectedRow } : el)) :
      [...data, { ...selectedRow, id: data.length + 1 }]
    setData(updatedData)
    localStorage.setItem("myData", JSON.stringify(updatedData))
    setIsModalFormOpen(false)
  }

  const handleEditClick = (value) => {
    setSelectedRow(value)
    console.log(value);
    setIsEditMode(true)
    setIsModalFormOpen(true);

  }

  const handleEditClose = () => {
    setIsEditMode(false)
    setIsModalFormOpen(false);

  }

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value)
  }

  const filteredData =
    data.filter(
      (row) =>
        row.car.toLowerCase().includes(search.toLowerCase()) ||
        row.car_model.toLowerCase().includes(search.toLowerCase()) ||
        row.car_vin.toLowerCase().includes(search.toLowerCase()) ||
        row.car_color.toLowerCase().includes(search.toLowerCase()) ||
        row.car_model_year.toString().includes(search.toLowerCase()) ||
        row.availability.toString().includes(search)
    )

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div className="searchWrapper">
        <TextField
        sx={{
        
          label: { color: "white", top: "5px" },
          input: { color: "white" }
        }}
        label="Search"
        value={search}
        onChange={handleSearch}
        variant="outlined"
      />
      <Button
        sx={{
          color: "white",
          backgroundColor: "green",
          left: "240px",
          position: "fixed",
          height: "55px", width: "50px",
          borderRadius: "5px",      
          marginTop: "5px"
        }}
        onClick={handleCreateNewRow}>
        Add
      </Button>
      </div>
      <DataGrid
        sx={{ color: "white", rows: { color: "white" } }}
        hideFooterSelectedRowCount
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
      />
      <ModalDelete
        isOpen={isDeleteModal}
        handleClose={handleDeleteClose}
        handleDelete={handleDeleteConfirm}
      />
      <ModalForm
        isOpen={isModalFormOpen}
        isEditMode={isEditMode}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        handleClose={handleEditClose}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}