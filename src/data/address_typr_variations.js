const address_type = [];

address_type[0] = 'AEROPORTO AEROP AERO.';
address_type[1] = 'ALAMEDA ALAM.';
address_type[2] = 'ÁREA AREA';
address_type[3] = 'AVENIDA AVENUE AV.';
address_type[4] = 'BÊCO BC BC. BECO';
address_type[5] = 'CHÁCARA CH CH. XKRA CHACARA';
address_type[6] = 'COLÔNIA COL.';
address_type[7] = 'CONDOMÍNIO CONDOM CONDOM. COND COND.'
address_type[8] = 'CONJUNTO CJ CJ.';
address_type[9] = 'DISTRITO DIST DISTR.';
address_type[10] = 'ESPLANADA ESP ESP. ESPLAN ESPLAN.';
address_type[11] = 'ESTAÇÃO ESTACAO EST.';
address_type[12] = 'ESTRADA ESTR ESTR.';
address_type[13] = 'FAVELA FV FV.';
address_type[14] = 'FAZENDA FZ FZ.';
address_type[15] = 'FEIRA FR FR.';
address_type[16] = 'JARDIM JD JD. JDM JDM.';
address_type[17] = 'LADEIRA LD LD. LAD LAD.';
address_type[18] = 'LAGO LG LG. LGO LGO.';
address_type[19] = 'LAGOA LG LG. LGA LGA.';
address_type[20] = 'LARGO LR LR. LRG LRG.';
address_type[21] = 'LOTEAMENTO LOT LOT. LOTEAM LOTEAM.';
address_type[22] = 'MORRO MÔRRO MRR MRR.';
address_type[23] = 'NÚCLEO NCL NCL.';
address_type[24] = 'PARQUE PQ PQ.';
address_type[25] = 'PASSARELA PSLR PSLR. PASS PASS.';
address_type[26] = 'PÁTIO PAT PAT.';
address_type[27] = 'PRAÇA PÇ PÇ.';
address_type[28] = 'QUADRA QD QD.';
address_type[29] = 'RECANTO REC REC.';
address_type[30] = 'RESIDENCIAL RESID RESID.';
address_type[31] = 'RODOVIA ROD ROD. RODOV RODOV.';
address_type[32] = 'RUA R R. RU RU.';
address_type[33] = 'SETOR ST ST.';
address_type[34] = 'SÍTIO ST ST. SIT SIT. SITIO';
address_type[35] = 'TRAVESSA TV TV. TRAV TRAV.';
address_type[36] = 'TRECHO TR TR. TCHO TCHO.';
address_type[37] = 'TREVO TVO TVO.'; 
address_type[38] = 'VIA V V.';
address_type[39] = 'VIADUTO VIAD VIAD.';
address_type[40] = 'VIELA VIE VIE. VLA VLA.';
address_type[41] = 'VILA VI VI. VLA VLA.';




export const setAddress = (adress) => {

    const adress_split = adress.split(' '); 

    for (let i = 0; i < address_type.length; i++) {

        if((address_type[i].indexOf(adress_split[0].toUpperCase()) !== -1)) {
            return adress_split.slice(1).join(' ');
        }    
    }    
    return adress_split.slice(0).join(' ');
}