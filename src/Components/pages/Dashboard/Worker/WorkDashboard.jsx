import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const WorkerDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    experienceYears: 0,
    rating: 0,
    bio: '',
    verified: false
  });

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await fetch('https://localhost:7062/api/Workers');
      const data = await response.json();
      setWorkers(data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleOpen = (worker = null) => {
    if (worker) {
      setEditMode(true);
      setSelectedWorker(worker);
      setFormData({
        userId: worker.userId,
        experienceYears: worker.experienceYears,
        rating: worker.rating,
        bio: worker.bio,
        verified: worker.verified
      });
    } else {
      setEditMode(false);
      setSelectedWorker(null);
      setFormData({
        userId: '',
        experienceYears: 0,
        rating: 0,
        bio: '',
        verified: false
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWorker(null);
    setFormData({
      userId: '',
      experienceYears: 0,
      rating: 0,
      bio: '',
      verified: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update worker
        await fetch(`https://localhost:7062/api/Workers/${selectedWorker.workerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            workerId: selectedWorker.workerId
          }),
        });
      } else {
        // Create worker
        await fetch('https://localhost:7062/api/Workers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      handleClose();
      fetchWorkers();
    } catch (error) {
      console.error('Error saving worker:', error);
    }
  };

  const handleDelete = async (workerId) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
      try {
        await fetch(`https://localhost:7062/api/Workers/${workerId}`, {
          method: 'DELETE',
        });
        fetchWorkers();
      } catch (error) {
        console.error('Error deleting worker:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Worker Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add New Worker
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Worker ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Experience (Years)</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Bio</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workers.map((worker) => (
                  <TableRow key={worker.workerId}>
                    <TableCell>{worker.workerId}</TableCell>
                    <TableCell>{worker.user?.fullName}</TableCell>
                    <TableCell>{worker.experienceYears}</TableCell>
                    <TableCell>
                      <Rating value={worker.rating} readOnly precision={0.1} />
                    </TableCell>
                    <TableCell>{worker.bio}</TableCell>
                    <TableCell>{worker.verified ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleOpen(worker)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(worker.workerId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Worker' : 'Add New Worker'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User ID"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  disabled={editMode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Experience Years"
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rating"
                  type="number"
                  inputProps={{ step: 0.1, min: 0, max: 5 }}
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.verified}
                      onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    />
                  }
                  label="Verified"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default WorkerDashboard;