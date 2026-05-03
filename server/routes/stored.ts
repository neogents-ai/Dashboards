import { Router } from 'express';
import { getLeads, addLead, deleteLead } from '../store/leads';

const router = Router();

router.get('/leads/:industry', (req, res) => {
  const { industry } = req.params;
  res.json({ success: true, leads: getLeads(industry) });
});

router.post('/leads/:industry', (req, res) => {
  const { industry } = req.params;
  const lead = req.body;
  addLead(industry, lead);
  res.json({ success: true });
});

router.delete('/leads/:industry/:id', (req, res) => {
  const { industry, id } = req.params;
  deleteLead(industry, id);
  res.json({ success: true });
});

export default router;
