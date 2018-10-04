import React from 'react';
import ExternalRedirect from '../components/external-redirect';

import constitutionPDF from '../files/constitution1.pdf';

const Constitution = () => <ExternalRedirect url={constitutionPDF} urlDescription="our constitution" />;

export default Constitution;
