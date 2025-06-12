import { askQuestion } from '../terminal';
import { linhas } from '../data/database';
import { LinhaOnibus } from '../data/models';
import { exibirMenuPrincipal } from '../index';

async function cadastrarLinha() {
    console.log('\n--- Cadastrar Nova Linha ---');
    const numero = await askQuestion('Digite o número da linha: ');
    const trajeto = await askQuestion('Digite o trajeto da linha (ex: Centro - Bairro X): ');

    const novaLinha: LinhaOnibus = { numero, trajeto, passageiros: [] };
    linhas.push(novaLinha);
    console.log(`\nLinha "${numero} - ${trajeto}" cadastrada com sucesso!`);
    await askQuestion('Pressione Enter para continuar...');
    await gerenciarLinhasMenu();
}

async function listarTodasAsLinhas() {
    console.log('\n--- Todas as Linhas Cadastradas ---');
    if (linhas.length === 0) {
        console.log('Nenhuma linha cadastrada ainda.');
    } else {
        linhas.forEach((linha) => {
            console.log(`- Número: ${linha.numero}, Trajeto: ${linha.trajeto} (${linha.passageiros.length} passageiro(s))`);
        });
    }
    await askQuestion('\nPressione Enter para continuar...');
    await gerenciarLinhasMenu();
}

export async function gerenciarLinhasMenu() {
    console.clear();
    console.log(`
=== GESTÃO DE LINHAS ===

[1] Cadastrar nova linha
[2] Listar todas as linhas
[0] Voltar ao menu principal
    `);

    const opcao = await askQuestion('Digite sua opção: ');

    switch (Number(opcao)) {
        case 1:
            await cadastrarLinha();
            break;
        case 2:
            await listarTodasAsLinhas();
            break;
        case 0:
            await exibirMenuPrincipal();
            break;
        default:
            console.log('Opção inválida.');
            await askQuestion('Pressione Enter para continuar...');
            await gerenciarLinhasMenu();
            break;
    }
}