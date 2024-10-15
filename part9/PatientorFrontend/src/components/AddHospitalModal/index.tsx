import { Dialog, DialogTitle, DialogContent, Divider,Alert } from '@mui/material';

import HospitalForm from './HospitalForm';
import { Diagnosis, NewEntry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
  error?:string;
}

const AddHospitalModal = ({ modalOpen, onClose, onSubmit, diagnoses, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>New Hospital entry</DialogTitle>
    <Divider />
    <DialogContent>
     {error && <Alert severity="error">{error}</Alert>}
      <HospitalForm onSubmit={onSubmit} diagnoses={diagnoses} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddHospitalModal;
