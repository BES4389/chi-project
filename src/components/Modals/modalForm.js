import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { Select, MenuItem } from '@mui/material';

export default function ModalForm({ isOpen, handleClose, selectedRow, setSelectedRow, isEditMode, handleFormSubmit }) {



    return (
        <div>

            <Dialog

                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ color: "white", textAlign: 'center', backgroundColor: "#444" }}>
                    {"Edit your row"}
                </DialogTitle>

                <DialogActions sx={{ backgroundColor: "#444", textAlign: 'center', input: { color: "white", borderRadius: 1, margin: "10px", padding: "10px" }, Button: { height: "55px", margin: "10px", backgroundColor: "green" }, label: { fontSize: "15px", color: "white", } }}>
                    <form onSubmit={handleFormSubmit}>
                        <TextField sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#C0C0C0",
                            },"& .MuiInputLabel-root.Mui-disabled":{WebkitTextFillColor: "#C0C0C0"}
                        }}
                            disabled={isEditMode}
                            label="Car"
                            value={selectedRow?.car || ''}
                            onChange={(event) => setSelectedRow({ ...selectedRow, car: event.target.value })}
                        />
                        <TextField sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#C0C0C0",
                            },"& .MuiInputLabel-root.Mui-disabled":{WebkitTextFillColor: "#C0C0C0"}
                        }}
                            disabled={isEditMode}
                            label="Car Model"
                            value={selectedRow?.car_model || ''}
                            onChange={(event) => setSelectedRow({ ...selectedRow, car_model: event.target.value })}
                        />
                        <TextField
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#C0C0C0",
                            },"& .MuiInputLabel-root.Mui-disabled":{WebkitTextFillColor: "#C0C0C0"}
                        }}
                            disabled={isEditMode}
                            label="VIN"
                            value={selectedRow?.car_vin || ''}
                            onChange={(event) => setSelectedRow({ ...selectedRow, car_vin: event.target.value })}
                        />
                        <TextField sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#C0C0C0",
                            },"& .MuiInputLabel-root.Mui-disabled":{WebkitTextFillColor: "#C0C0C0"}
                        }}
                            label="Car Color"
                            value={selectedRow?.car_color || ''}
                            onChange={(event) => setSelectedRow({ ...selectedRow, car_color: event.target.value })}
                        />
                        <TextField sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#C0C0C0",
                            },"& .MuiInputLabel-root.Mui-disabled":{WebkitTextFillColor: "#C0C0C0"}
                        }}
                        
                            disabled={isEditMode}
                            label="Model Year"
                            value={selectedRow?.car_model_year || ''}
                            onChange={(event) => setSelectedRow({ ...selectedRow, car_model_year: event.target.value })}

                        />
                        <TextField
                            label="Price"
                            value={selectedRow?.price || ''}
                            onChange={(event) => setSelectedRow({ ...selectedRow, price: event.target.value })}


                        />
                        <InputLabel sx={{ right: "110px", margin: "-5px" }} id="demo-select-small-label">Availability</InputLabel>
                        <Select
                            sx={{ color: "white", label: { color: "white" } }}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Availability"
                            value={selectedRow?.availability || false}
                            onChange={(event) => setSelectedRow({ ...selectedRow, availability: event.target.value })}
                        >
                            <MenuItem
                                value={"YES"}>YES</MenuItem>
                            <MenuItem value={"NO"}>NO</MenuItem>
                        </Select>

                        <Button type="submit" variant="contained" color="primary">
                            Save Changes

                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
        </div>

    );

}