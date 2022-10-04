const masculine = [
    '',
    'Caro',
    'Sr.',
    'Prezado',
    'Dr.',
    'Ilmo.',
    'Prof.',
    'Exmo.',
    'Rvmo.',
    'Carissímo',
    'Mr.',
    'Amigo',
    'Aluno',
    'Estagiário'
];

const female = [
    '',
    'Cara',
    'Sra.',
    'Srta.',
    'Prezada',
    'Dra.',
    'Ilma.',
    'Profa.',
    'Exma.',
    'Rvma.',
    'Carissíma',
    'Mrs.',
    'Miss.',
    'Amiga',    
    'Aluna',
    'Estagiária'
];

export const getTreatmentMasculine = () => { 
    return masculine;
};

export const getTreatmentFemale = () => { 
    return female;
};