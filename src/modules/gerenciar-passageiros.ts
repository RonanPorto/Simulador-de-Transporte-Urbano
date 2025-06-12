import { askQuestion } from '../terminal';
import { passageiros } from '../data/database';
import { Passageiro } from '../data/models';
import { exibirMenuPrincipal } from '../index';

async function cadastrarPassageiro() {
    console.log('\n--- Cadastrar Novo Passageiro ---');
    const nome = await askQuestion('Digite o nome do passageiro: ');
    const documento = await askQuestion('Digite o documento do passageiro (RG/CPF): ');

    const novoPassageiro: Passageiro = { nome, documento };
    passageiros.push(novoPassageiro);
    console.log(`\nPassageiro "${nome}" cadastrado com sucesso!`);
    await askQuestion('Pressione Enter para continuar...');
    await gerenciarPassageirosMenu();
}

async function listarTodosOsPassageiros() {
    console.log('\n--- Todos os Passageiros Cadastrados ---');
    if (passageiros.length === 0) {
        console.log('Nenhum passageiro cadastrado ainda.');
    } else {
        passageiros.forEach((passageiro) => {
            console.log(`- Nome: ${passageiro.nome}, Documento: ${passageiro.documento}`);
        });
    }
    await askQuestion('\nPressione Enter para continuar...');
    await gerenciarPassageirosMenu();
}

export async function gerenciarPassageirosMenu() {
    console.clear();
    console.log(`
=== GESTÃO DE PASSAGEIROS ===

[1] Cadastrar novo passageiro
[2] Listar todos os passageiros
[0] Voltar ao menu principal
    `);

    const opcao = await askQuestion('Digite sua opção: ');

    switch (Number(opcao)) {
        case 1:
            await cadastrarPassageiro();
            break;
        case 2:
            await listarTodosOsPassageiros();
            break;
        case 0:
            await exibirMenuPrincipal();
            break;
        default:
            console.log('Opção inválida.');
            await askQuestion('Pressione Enter para continuar...');
            await gerenciarPassageirosMenu();
            break;
    }
}