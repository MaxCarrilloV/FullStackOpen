import { Dialog, DialogTitle, DialogContent, Divider,Alert } from '@mui/material';

import OccupationForm from './OccupationForm';
import { Diagnosis, NewEntry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
  error?:string;
}

const AddOccupationModal = ({ modalOpen, onClose, onSubmit, diagnoses, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>New Occupational Health care entry</DialogTitle>
    <Divider />
    <DialogContent>
     {error && <Alert severity="error">{error}</Alert>}
      <OccupationForm onSubmit={onSubmit} diagnoses={diagnoses} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddOccupationModal;
