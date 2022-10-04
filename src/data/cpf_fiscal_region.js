const region = [];

region[0] = 'RS';
region[1] = '~GO~MS~MT~TO';
region[2] = 'AC~AM~AP~PA~RO~RR';
region[3] = 'CE~MA~PI';
region[4] = 'AL~PB~PE~RN';
region[5] = '{BA~SE';
region[6] = 'MG';
region[7] = 'ES~RJ';
region[8] = 'SP';
region[9] = 'PR~SC';

export const getRegionCpf = (cpf) => { 

    if (cpf) {
        const digit = cpf.substr(8, 1);
        return region[parseInt(digit)];
    }    
};