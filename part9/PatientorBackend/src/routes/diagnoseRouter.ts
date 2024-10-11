import expres from 'express';
import diagnoseService from '../services/diagnoseService';
const router = expres.Router();
router.get('/',(_req,res) =>{
    res.send(diagnoseService.getDiagnose());
});
export default router;