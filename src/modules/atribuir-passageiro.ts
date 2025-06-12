import { askQuestion } from '../terminal';
import { linhas, passageiros } from '../data/database';
import { exibirMenuPrincipal } from '../index';

export async function atribuirPassageiroALinha() {
    console.clear();
    console.log('\n--- Atribuir Passageiro a Linha ---');

    if (linhas.length === 0 || passageiros.length === 0) {
        console.log('É necessário ter ao menos uma linha e um passageiro cadastrados.');
        await askQuestion('Pressione Enter para voltar ao menu principal...');
        await exibirMenuPrincipal();
        return;
    }

    console.log('\nLinhas disponíveis:');
    linhas.forEach((linha, index) => {
        console.log(`${index + 1}. Número: ${linha.numero}, Trajeto: ${linha.trajeto}`);
    });
    const linhaIndex = Number(await askQuestion('\nEscolha a linha: ')) - 1;

    console.log('\nPassageiros disponíveis:');
    passageiros.forEach((passageiro, index) => {
        console.log(`${index + 1}. Nome: ${passageiro.nome}, Documento: ${passageiro.documento}`);
    });
    const passageiroIndex = Number(await askQuestion('\nEscolha o passageiro: ')) - 1;

    if (isNaN(linhaIndex) || isNaN(passageiroIndex) || !linhas[linhaIndex] || !passageiros[passageiroIndex]) {
        console.log('\nSeleção inválida.');
    } else {
        const linha = linhas[linhaIndex];
        const passageiro = passageiros[passageiroIndex];

        if (linha.passageiros.some(p => p.documento === passageiro.documento)) {
            console.log(`\nO passageiro "${passageiro.nome}" já está nesta linha.`);
        } else {
            linha.passageiros.push(passageiro);
            console.log(`\nPassageiro "${passageiro.nome}" atribuído à linha "${linha.numero}" com sucesso!`);
        }
    }

    await askQuestion('Pressione Enter para voltar ao menu principal...');
    await exibirMenuPrincipal();
}