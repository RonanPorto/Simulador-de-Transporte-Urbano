export interface Passageiro {
    nome: string;
    documento: string;
}

export interface LinhaOnibus {
    numero: string;
    trajeto: string;
    passageiros: Passageiro[];
}