export interface Lead {
  id: string;
  name: string;
  business: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  source: string;
  score: number;
  tags: string[];
  notes: string | null;
  scraped_at: string;
  industry: string;
}

const leadsStore = new Map<string, Lead[]>();

export const getLeads = (industry: string): Lead[] => {
  return leadsStore.get(industry) || [];
};

export const addLead = (industry: string, lead: Lead) => {
  const leads = leadsStore.get(industry) || [];
  leads.push(lead);
  leadsStore.set(industry, leads);
};

export const deleteLead = (industry: string, id: string) => {
  const leads = leadsStore.get(industry) || [];
  leadsStore.set(industry, leads.filter(l => l.id !== id));
};
