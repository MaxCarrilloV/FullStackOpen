import { Dialog, DialogTitle, DialogContent, Divider,Alert } from '@mui/material';

import HealthCheckForm from './HealthCheckForm';
import { Diagnosis, NewEntry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
  error?:string;
}

const AddHealthCheckFormModal = ({ modalOpen, onClose, onSubmit, diagnoses, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>New HealthCheck entry</DialogTitle>
    <Divider />
    <DialogContent>
     {error && <Alert severity="error">{error}</Alert>}
      <HealthCheckForm onSubmit={onSubmit} diagnoses={diagnoses} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddHealthCheckFormModal;
